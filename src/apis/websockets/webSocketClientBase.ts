import { WebSocket as NodeWebSocket } from "ws"; // ✅ Import ws for Node.js
import { Observable, Subject } from "rxjs";
import { BASE_WS_URL } from "..";

// Auto-detect whether running in a browser or Node.js
const WebSocketImpl = typeof window !== "undefined" ? WebSocket : NodeWebSocket;

class WebSocketService {
    private static instance: WebSocketService;
    private sockets: Map<string, InstanceType<typeof WebSocketImpl>> = new Map(); // Stores WebSocket instances by path
    private subjects: Map<string, Subject<any>> = new Map(); // Stores event subjects by path

    private constructor() { } // Singleton Pattern: Private constructor

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    // ✅ Ensures the WebSocket connection for a specific path
    private ensureConnection(path: string) {
        if (!this.sockets.has(path)) {
            console.log(`🔗 Connecting to WebSocket path: ${path}`);
            const ws = new WebSocketImpl(`wss://${BASE_WS_URL}${path}`);

            this.sockets.set(path, ws);
            ws.onopen = () => console.log(`✅ Connected to ${path}`);
            ws.onclose = (s:any) => {
                console.log(`⚠️ Disconnected from ${path}`,s);
                // this.cleanup(path);
            };
            ws.onerror = (error: any) => console.error(`❌ WebSocket error (${path}):`, error);
        }
    }

    // ✅ Subscribes to WebSocket events for a specific path and returns an RxJS Observable<T>
    public listen<T>(path: string): Observable<T> {
        this.ensureConnection(path);

        if (this.subjects.has(path)) {
            return this.subjects.get(path)!.asObservable() as Observable<T>; // ✅ Reuse existing connection
        }

        console.log(`🟢 Listening for WebSocket path: ${path}`);
        const subject = new Subject<T>();

        const ws = this.sockets.get(path)!;
        ws.onmessage = (event: MessageEvent) => {
            try {
                const data: T = JSON.parse(event.data);
                subject.next(data);
            } catch (error) {
                console.error("❌ Error parsing WebSocket message:", error);
            }
        };

        this.subjects.set(path, subject);
        return subject.asObservable();
    }

    // ✅ Disconnects from a specific WebSocket path
    public disconnect(path: string) {
        console.log(`🔌 Disconnecting from WebSocket path: ${path}`);

        if (this.sockets.has(path)) {
            this.sockets.get(path)?.close();
            this.sockets.delete(path);
        }

        if (this.subjects.has(path)) {
            this.subjects.get(path)!.complete();
            this.subjects.delete(path);
        }
    }

    // ✅ Fully disconnects from all WebSocket paths
    public disconnectAll() {
        console.log("🔌 Disconnecting from all WebSocket paths...");

        this.sockets.forEach((ws, path) => {
            ws.close();
            console.log(`🔴 Disconnected from ${path}`);
        });

        this.sockets.clear();

        this.subjects.forEach((subject) => subject.complete());
        this.subjects.clear();
    }
}

// ✅ Singleton instance
export const webSocketService = WebSocketService.getInstance();