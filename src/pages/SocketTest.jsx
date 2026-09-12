import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

export default function SocketTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 [Socket.IO] Connected successfully! Socket ID:", socket.id);

      setIsConnected(true);
      setSocketId(socket.id || "");
      socket.emit("hello", "hello from client");

    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 [Socket.IO] Disconnected. Reason:", reason);
      setIsConnected(false);
      setSocketId("");
    });

    socket.on("connect_error", (error) => {
      console.error("⚠️ [Socket.IO] Connection error:", error.message);
    });


    // Cleanup on component unmount
    return () => {
      console.log("🧹 [Socket.IO] Disconnecting socket instance...");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <h2 className="text-xl font-bold tracking-wide text-slate-100">
            Socket.IO Connection Test
          </h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700 text-slate-300 font-mono">
            Temporary Component
          </span>
        </div>

        {/* Server Target Info */}
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 text-xs font-mono text-slate-400">
          <span className="text-slate-500">Target Backend: </span>
          <span className="text-emerald-400 font-semibold">{SOCKET_SERVER_URL}</span>
        </div>

        {/* Connection Status Badge */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Connection Status
          </label>
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-900/80 border border-slate-700">
            <span
              className={`h-4 w-4 rounded-full ${isConnected
                  ? "bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                  : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                }`}
            />
            <span
              className={`text-lg font-bold ${isConnected ? "text-emerald-400" : "text-red-400"
                }`}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* Socket ID Display */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Socket ID
          </label>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 font-mono text-sm break-all">
            {isConnected ? (
              <span className="text-emerald-300 font-semibold">{socketId}</span>
            ) : (
              <span className="text-slate-500 italic">Not Connected</span>
            )}
          </div>
        </div>

        {/* Console Log Hint */}
        <div className="text-xs text-slate-400 bg-slate-700/30 p-3 rounded-lg border border-slate-700/40">
          💡 Open browser Developer Tools Console (F12) to see connect/disconnect logs.
        </div>
        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer" onClick={() => socketRef.current.emit("hello", "hello from client")}>
          Send Message
        </button>
      </div>
    </div>
  );
}
