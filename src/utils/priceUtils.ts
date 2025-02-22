import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Decimal from "decimal.js";
import BN from "bn.js";
import { adjustDecimals } from "../utils";
import { BondingCurvePool } from "../types";



export const calculateArea = (
  x1: Decimal,
  x2: Decimal,
  curveConstant: Decimal,
  curveExponent: Decimal
): Decimal => {
  if (curveExponent.equals(new Decimal(1))) {
    return Decimal.ln(x2.plus(curveConstant)).minus(
      Decimal.ln(x1.plus(curveConstant))
    );
  } else {
    const oneMinusExp = new Decimal(1).minus(curveExponent);
    const startVal = x1
      .plus(curveConstant)
      .toPower(oneMinusExp)
      .div(oneMinusExp);
    const endVal = x2.plus(curveConstant).toPower(oneMinusExp).div(oneMinusExp);
    return endVal.minus(startVal);
  }
};

export interface InternalSwapQuote {
  amountIn: BN;
  amountOut: BN;
  direction: "buy" | "sell";
  slippage: number;
}

export interface SwapQuote {
  amountOut: number;
  minAmountOut: number;
  quote: InternalSwapQuote;
  liquidityProviderFee: number;
}

export const getQuoteForAmount = async ({
  pool,
  amountInUI,
  slippage,
  direction,
  decimals = 9,
}: {
  pool: BondingCurvePool;
  amountInUI: Decimal;
  slippage: number;
  direction: "buy" | "sell";
  decimals?: number;
}): Promise<SwapQuote> => {
  const currentSolRaised = new Decimal(pool.currentSol.toString());
  const targetRaise = new Decimal(pool.targetRaise.toString());
  const curveConstant = new Decimal(pool.curveConstant.toString());
  const tradableTokenSupply = new Decimal(pool.initialTokens.toString()).div(
    Decimal.pow(10, decimals)
  );

  if (direction === "buy") {
    let lamports = amountInUI.mul(LAMPORTS_PER_SOL);

    const remainingSol = targetRaise.minus(currentSolRaised);

    if (lamports.greaterThan(remainingSol)) {
      lamports = remainingSol;
    }

    const stakingNetworkFee = lamports.div(100); // 1% fee

    const tokensIssued = getBuyQuote({
      buySolAmount: lamports.div(LAMPORTS_PER_SOL),
      curveTargetSol: targetRaise.div(LAMPORTS_PER_SOL),
      currentSolRaised: currentSolRaised.div(LAMPORTS_PER_SOL),
      tradableTokenSupply,
      curveConstant,
      curveExponent: new Decimal(pool.curveExponent.toString()),
    });

    const scaledTokensIssued = tokensIssued
      .mul(Decimal.pow(10, decimals))
      .floor();

    const minAmountOut = scaledTokensIssued.minus(
      scaledTokensIssued.div(100).mul(slippage / 100)
    );

    return {
      amountOut: adjustDecimals(scaledTokensIssued, decimals),
      minAmountOut: adjustDecimals(minAmountOut, decimals),
      liquidityProviderFee: adjustDecimals(stakingNetworkFee, decimals),
      quote: {
        amountIn: new BN(lamports.toFixed(0)),
        amountOut: new BN(scaledTokensIssued.toFixed(0)),
        direction,
        slippage,
      },
    };
  } else {
    const tokens = amountInUI.mul(Decimal.pow(10, decimals));

    const { tolerance } = derivePrecision({
      decimals: new Decimal(decimals),
      supply: new Decimal(pool?.totalSupply.toString()).div(
        Decimal.pow(10, decimals)
      ),
      targetSol: targetRaise.div(LAMPORTS_PER_SOL),
      curveConstant,
      curveExponent: new Decimal(pool.curveExponent.toString()),
    });

    const solReceived = getSellQuote({
      tokensToSell: amountInUI,
      totalTokenSupply: tradableTokenSupply,
      currentSolRaised: currentSolRaised.div(LAMPORTS_PER_SOL),
      targetSol: targetRaise.div(LAMPORTS_PER_SOL),
      curveConstant,
      curveExponent: new Decimal(pool.curveExponent.toString()),
      tolerance,
    });

    const stakingNetworkFee = solReceived.div(100); // 1% fee
    const adjustedSolReceived = solReceived.minus(stakingNetworkFee);

    const minAmountOut = adjustedSolReceived.minus(
      adjustedSolReceived.div(100).mul(slippage / 100)
    );

    const adjustedLamportsReceived = solReceived.mul(LAMPORTS_PER_SOL).floor();

    return {
      amountOut: Number(adjustedSolReceived.toFixed(9, Decimal.ROUND_DOWN)),
      minAmountOut: Number(minAmountOut.toFixed(9, Decimal.ROUND_DOWN)),
      liquidityProviderFee: Number(
        stakingNetworkFee.toFixed(9, Decimal.ROUND_DOWN)
      ),
      quote: {
        amountIn: new BN(tokens.toFixed(0)),
        amountOut: new BN(adjustedLamportsReceived.toFixed(0)),
        direction: "sell",
        slippage,
      },
    };
  }
};

export const getBuyQuote = ({
  buySolAmount,
  curveTargetSol,
  currentSolRaised,
  tradableTokenSupply,
  curveConstant,
  curveExponent,
}: {
  buySolAmount: Decimal;
  curveTargetSol: Decimal;
  currentSolRaised: Decimal;
  tradableTokenSupply: Decimal;
  curveConstant: Decimal;
  curveExponent: Decimal;
}): Decimal => {
  // 1) Рассчитываем общее количество SOL после покупки
  const totalSolAfterPurchase = currentSolRaised.plus(buySolAmount);
  if (totalSolAfterPurchase.greaterThan(curveTargetSol)) {
    throw new Error("Purchase exceeds the target SOL for the curve.");
  }

  // 2) Интегрируем весь диапазон [0..curveTargetSol] => totalArea
  const totalArea = calculateArea(
    new Decimal(0),
    curveTargetSol,
    curveConstant,
    curveExponent
  );

  // 3) scaleFactor так, чтобы totalArea соответствовал tradableTokenSupply
  const scaleFactor = tradableTokenSupply.div(totalArea);

  // 4) Интегрируем [currentSolRaised..totalSolAfterPurchase]
  const areaForPurchase = calculateArea(
    currentSolRaised,
    totalSolAfterPurchase,
    curveConstant,
    curveExponent
  );

  // 5) Итоговое количество токенов = scaleFactor * areaForPurchase
  return scaleFactor.times(areaForPurchase);
};

export const getSellQuote = ({
  tokensToSell,
  totalTokenSupply,
  currentSolRaised,
  targetSol,
  curveConstant,
  curveExponent,
  tolerance,
}: {
  tokensToSell: Decimal;
  totalTokenSupply: Decimal;
  currentSolRaised: Decimal;
  targetSol: Decimal;
  curveConstant: Decimal;
  curveExponent: Decimal;
  tolerance: Decimal;
}): Decimal => {
  // 1) Доля от общего количества токенов, которую вы продаёте
  const tokenPercentage = tokensToSell.div(totalTokenSupply);

  // 2) Общая площадь интеграла по диапазону [0..targetSol]
  const totalArea = calculateArea(
    new Decimal(0),
    targetSol,
    curveConstant,
    curveExponent
  );

  // 3) Площадь, соответствующая продаваемой доле токенов
  const targetArea = tokenPercentage.times(totalArea);

  // 4) Текущая площадь интеграла по диапазону [0..currentSolRaised]
  const currentArea = calculateArea(
    new Decimal(0),
    currentSolRaised,
    curveConstant,
    curveExponent
  );

  // 5) Новая площадь после продажи: currentArea - targetArea
  const newArea = currentArea.minus(targetArea);

  if (tolerance.gt(newArea)) {
    // In this case, the corresponding SOL value is 0 (i.e. area(0) = 0),
    // so the SOL received is currentSolRaised - 0 = currentSolRaised.
    return currentSolRaised;
  }

  // 6) Поиск значения SOL (tX), которое соответствует newArea, в диапазоне [0..currentSolRaised]

  const tX = findSolFromAreaBrent({
    targetNewArea: newArea,
    curveConstant,
    curveExponent,
    low: new Decimal(0),
    high: currentSolRaised,
    tolerance,
    maxIterations: 1000,
  });

  // 7) Полученное количество SOL = currentSolRaised - tX
  const solReceived = currentSolRaised.minus(tX);

  return solReceived;
};

export interface FindSolFromAreaBrentParams {
  targetNewArea: Decimal;
  curveConstant: Decimal;
  curveExponent: Decimal;
  low: Decimal;
  high: Decimal;
  tolerance: Decimal;
  maxIterations: number;
}

export const findSolFromAreaBrent = ({
  targetNewArea,
  curveConstant,
  curveExponent,
  low,
  high,
  tolerance,
  maxIterations,
}: FindSolFromAreaBrentParams): Decimal => {
  // Функция f(sol) = area(0..sol) - targetNewArea
  const f = (sol: Decimal): Decimal =>
    calculateArea(new Decimal(0), sol, curveConstant, curveExponent).minus(
      targetNewArea
    );

  let a = low;
  let b = high;
  let fa = f(a);
  let fb = f(b);

  // Проверяем, что значения функции на концах интервала имеют разные знаки
  if (fa.times(fb).gte(0)) {
    throw new Error(
      "Function doesn't have opposite signs at interval endpoints."
    );
  }

  let c = a;
  let fc = fa;
  let d = b.minus(a);
  let e = b.minus(a);

  for (let i = 0; i < maxIterations; i++) {
    // Если f(b) и f(c) одного знака, перемещаем c в a
    if (fb.times(fc).gt(0)) {
      c = a;
      fc = fa;
      d = b.minus(a);
      e = b.minus(a);
    }

    // Если по модулю f(c) меньше, чем f(b) – меняем местами a и b
    if (fc.abs().lt(fb.abs())) {
      [a, b] = [b, a];
      [fa, fb] = [fb, fa];
      c = a;
      fc = fa;
    }

    // Вычисляем допускаемую погрешность tol и полуинтервал m
    const tol = new Decimal(2)
      .times(tolerance)
      .times(b.abs())
      .plus(new Decimal(0.5).times(tolerance));
    const m = c.minus(b).div(2);

    // Если интервал достаточно мал или найден корень (fb == 0), завершаем итерации
    if (m.abs().lte(tol) || fb.equals(0)) {
      return b;
    }

    let dNew: Decimal;
    let eNew: Decimal;

    // Попытка использовать интерполяцию (метод секущих или обратной параболической интерполяции)
    if (e.abs().gte(tol) && fa.abs().gt(fb.abs())) {
      const s = fb.div(fa);
      let p: Decimal;
      let q: Decimal;

      if (a.equals(c)) {
        // Линейная интерполяция
        p = m.times(2).times(s);
        q = new Decimal(1).minus(s);
      } else {
        // Обратная параболическая интерполяция
        q = fa.div(fc);
        const r = fb.div(fc);
        p = s.times(
          new Decimal(2)
            .times(m)
            .times(q)
            .times(q.minus(r))
            .minus(b.minus(a).times(r.minus(new Decimal(1))))
        );
        q = q
          .minus(new Decimal(1))
          .times(r.minus(new Decimal(1)))
          .times(s.minus(new Decimal(1)));
      }

      if (p.gt(0)) {
        q = q.negated();
      }
      p = p.abs();

      const min1 = new Decimal(3).times(m).times(q).minus(tol.times(q).abs());
      const min2 = e.times(q).abs();
      const minValue = min1.lt(min2) ? min1 : min2;

      if (new Decimal(2).times(p).lt(minValue)) {
        eNew = d;
        dNew = p.div(q);
      } else {
        dNew = m;
        eNew = m;
      }
    } else {
      dNew = m;
      eNew = m;
    }

    // Сдвигаем интервал: a = b, fa = fb
    a = b;
    fa = fb;

    // Обновляем b: если |d| > tol, то b + d, иначе сдвиг на tol (в зависимости от знака m)
    if (dNew.abs().gt(tol)) {
      b = b.plus(dNew);
    } else {
      b = b.plus(m.gt(0) ? tol : tol.negated());
    }
    fb = f(b);

    // Обновляем значения для следующей итерации
    d = dNew;
    e = eNew;
  }

  throw new Error("Max iterations reached without convergence.");
};

export interface DerivedPrecision {
  /**
   * The integration step size in SOL (the precision factor).
   * This determines the “slice” size when integrating the bonding curve.
   */
  precisionFactor: Decimal;
  /**
   * The absolute tolerance in SOL for the integration error.
   * When multiplied by the scale factor (updatedTotalTokenSupply/totalArea),
   * this gives the error in token units.
   */
  tolerance: Decimal;
}
/**
 * Derives numerical parameters (precisionFactor and tolerance) from the five inputs.
 *
 * In our bonding curve, the total token error (in token units) should be within
 * a certain fraction of the updated total token supply.
 *
 * If we want a token error ≤ ε × updatedTotalTokenSupply, then since
 * tokenError ≈ tolerance × scaleFactor and scaleFactor = updatedTotalTokenSupply/totalArea,
 * we get
 *
 *    tolerance = ε × totalArea.
 *
 * For a fixed ε this does not depend on updatedTotalTokenSupply. However, when the
 * token supply is enormous, a fixed relative error (say, 1e-6) may be too loose.
 * Therefore, we define an effective relative error that tightens when updatedTotalTokenSupply is huge.
 *
 * For example:
 *   - If updatedTotalTokenSupply > 1e18, use ε_eff = 1e-8.
 *   - Else if updatedTotalTokenSupply > 1e12, use ε_eff = 1e-7.
 *   - Otherwise, use ε_eff = 1e-6.
 *
 * Then:
 *
 *    tolerance = ε_eff × totalArea.
 *
 * Finally, we set the integration step (precisionFactor) so that the local error,
 * approximately f(0) × precisionFactor, is at most 1/10 of the tolerance.
 *
 * @param decimals - The number of decimals for the token mint.
 * @param supply - The base token supply (before applying decimals).
 * @param targetSol - The target SOL for the bonding curve.
 * @param curveConstant - The horizontal shift of the bonding curve.
 * @param curveExponent - The exponent of the bonding curve.
 *
 * @returns An object with the derived precisionFactor and tolerance (both in SOL units).
 */
export function derivePrecision({
  decimals,
  supply,
  targetSol,
  curveConstant,
  curveExponent,
}: {
  decimals: Decimal;
  supply: Decimal;
  targetSol: Decimal;
  curveConstant: Decimal;
  curveExponent: Decimal;
}): DerivedPrecision {
  // 1. Вычисляем обновлённое общее количество токенов: updatedTotalTokenSupply = supply * 10^decimals.
  const updatedTotalTokenSupply = supply.mul(new Decimal(10).pow(decimals));

  // 2. Вычисляем общую площадь под кривой от 0 до targetSol.
  let totalArea: Decimal;
  if (curveExponent.equals(1)) {
    // totalArea = ln((targetSol + curveConstant) / curveConstant)
    totalArea = Decimal.ln(targetSol.add(curveConstant).div(curveConstant));
  } else {
    // totalArea = ((targetSol + curveConstant)^(1 - curveExponent) - (curveConstant)^(1 - curveExponent)) / (1 - curveExponent)
    totalArea = targetSol
      .add(curveConstant)
      .pow(new Decimal(1).minus(curveExponent))
      .minus(curveConstant.pow(new Decimal(1).minus(curveExponent)))
      .div(new Decimal(1).minus(curveExponent));
  }

  // 4. Определяем эффективную относительную ошибку (ε_eff) в зависимости от updatedTotalTokenSupply.
  let effectiveRelativeError: Decimal;
  if (updatedTotalTokenSupply.gt(new Decimal("1e18"))) {
    effectiveRelativeError = new Decimal("1e-8");
  } else if (updatedTotalTokenSupply.gt(new Decimal("1e12"))) {
    effectiveRelativeError = new Decimal("1e-7");
  } else {
    effectiveRelativeError = new Decimal("1e-6");
  }
  // desiredAbsoluteTokenError = effectiveRelativeError * updatedTotalTokenSupply,
  // поскольку token error = tolerance * scaleFactor, получаем: tolerance = effectiveRelativeError * totalArea.
  const tolerance = effectiveRelativeError.mul(totalArea);

  // 5. Определяем шаг интегрирования (precisionFactor).
  // Интегрируемая функция: f(x) = 1 / (x + curveConstant)^curveExponent.
  // Её максимум достигается при x = 0: f(0) = 1 / (curveConstant^curveExponent).
  const f0 = new Decimal(1).div(curveConstant.pow(curveExponent));
  // Требуем, чтобы: f(0) * precisionFactor <= tolerance / 10.
  const candidateFromDerivative = tolerance.div(new Decimal(10).mul(f0));

  // 6. Также обеспечиваем минимальное число разбиений на отрезке [0, targetSol]:
  const candidateFromSlices = targetSol.div(new Decimal("1e5"));

  // Выбираем более консервативное (меньшее) значение.
  const precisionFactor = Decimal.min(
    candidateFromDerivative,
    candidateFromSlices
  );

  return { precisionFactor, tolerance };
}
