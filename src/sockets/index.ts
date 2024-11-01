import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from 'http';
import createHttpError from "http-errors";


class SocketConfig {
    private io: SocketIOServer | undefined;
    private socket: Socket | undefined;

    constructor() {}

    initialize(server: HttpServer) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: `${process.env.APP_URL ? process.env.APP_URL :"http://localhost:5173"}`,
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true,
            }
        });

        this.io.on("connection", (socket) => {
            // console.log("A user connected: ", socket.id);
            this.socket = socket;

            // Você pode adicionar eventos aqui
            socket.on("disconnect", () => {
                // console.log("User disconnected: ", socket.id);
                this.socket = undefined; // Limpar a referência do socket ao desconectar
            });
        });
    }

    getIO(): SocketIOServer {
        if (!this.io) {
            throw createHttpError(400, 'Socket.IO não inicializado!');
        }
        return this.io;
    }

    getSocket(): Socket | undefined {
        return this.socket;
    }

    sendNotificationToConnectedUsers(new_notification: object){
        if (this.io) {
            this.io.emit("notification", new_notification)
        }
    }
}

export default SocketConfig;
