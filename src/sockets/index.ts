import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from 'http';
import createHttpError from "http-errors";
3

class SocketConfig {
    private io: SocketIOServer | undefined;
    public _socket: Socket | undefined;
    private connectedSockets: Map<string, Socket>; // Map para gerenciar vários sockets

    constructor() {
        this.connectedSockets = new Map();    
    }

    initialize(server: HttpServer) {
        if (this.io){
            console.warn("Socket.io já foi inicializado.")
            return
        }

        this.io = new SocketIOServer(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true,
            }
        });

        this.io.on("connection", async (socket: Socket) => {
            this.handleConnection(socket);
        });
    }

    private handleConnection(socket: Socket) {
        // console.log("Cliente conectado:", socket.id);
        this.connectedSockets.set(socket.id, socket); // Adiciona o socket ao Map
        this._socket = socket

        // Evento de desconexão
        socket.on("disconnect", () => {
            // console.log("Cliente desconectado:", socket.id);
            this.connectedSockets.delete(socket.id); // Remove o socket ao desconectar
        });
    }

    getIO(): SocketIOServer {
        if (!this.io) {
            throw createHttpError(400, 'Socket.IO não foi inicializado!');
        }
        return this.io;
    }

    sendNotificationToConnectedUsers(new_notification: object) {
        if (this.io) {
            // console.log("Enviando notificação para todos os clientes conectados");
            this.io.emit("notification", new_notification);
        } else {
            console.error("Socket.IO não foi inicializado. Notificação não enviada.");
        }
    }

    updateTestimonials(newTestimonial: object) {
        if (this.io) {
            this.io.emit("testimonials", newTestimonial);
        } else {
            console.error("Socket.IO não foi inicializado. Notificação não enviada.");
        }
    }

    sendNotificationToSpecificUser(socketId: string, notification: object) {
        const socket = this.connectedSockets.get(socketId);
        if (socket) {
            // console.log(`Enviando notificação para o cliente ${socketId}`);
            socket.emit("notification", notification);
        } else {
            console.error(`Cliente com socket ID ${socketId} não encontrado ou desconectado.`);
        }
    }

    sendTestimonial(new_testimonial: object) {
        if (this.io){
            console.log("Depoimento criado.")
            this.io.emit("testimonial", new_testimonial)
        }
    }

    sendMessageToConectedUsers(new_message: object) {
        // const socket = this.connectedSockets.get();
        
        if (this.io){
            const sockets = this.io.sockets

            sockets.emit("message", new_message)
        }
    }
}

export default new SocketConfig();
