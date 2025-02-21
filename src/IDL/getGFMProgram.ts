import { Gofundmeme } from './types/gofundmeme'
import idl from './idl/gofundmeme.json'
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { GFM_PROGRAM } from '../constants'

export const getGFMProgram = (provider: AnchorProvider) =>
    new Program<Gofundmeme>(idl as unknown as Gofundmeme, GFM_PROGRAM.toString(), provider)