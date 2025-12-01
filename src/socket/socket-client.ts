import { io, Socket } from "socket.io-client";
import { useAuthSelector } from "../common/stores/useAuthStore";

let socket: Socket | null = null;

export const initSocket = (token: string): Socket => {
  if (!socket) {
    socket = io("http://localhost:8000", {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("Socket connected", socket?.id));
    socket.on("disconnect", (reason: string) =>
      console.log("Socket disconnected", reason),
    );
    socket.on("connect_error", (err: Error & { message: string }) =>
      console.error("Socket connect error:", err.message),
    );
  }
  return socket;
};

export const getSocket = (): Socket => {
  const token = useAuthSelector((state) => state.token);
  if (token) {
    const socket = initSocket(token);
    return socket;
  }
  return {} as Socket;
};
