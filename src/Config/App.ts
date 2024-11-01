import express, { Express, Request, Response, NextFunction } from "express";
import { Server as HttpServer, createServer } from "node:http";
import createHttpError, { HttpError } from "http-errors";
import dotenv from "dotenv"
import { routes } from "../Routes/index";
import { deleteFile } from "../helpers/deleteFile";
import SocketConfig from "../sockets";
import cors from "cors"
import path from "node:path";


dotenv.config()

export class Application {
    public app: Express;
    public server: HttpServer;
    private port: number

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.middlewares()
        this.routes()
        this.sockets()
        this.port = Number(process.env.PORT) || 4422
    }

    routes() {
        this.app.use(routes)

        // Default Route
        this.app.get("/", (Request, Response) => {
            Response.send("WELCOME TO EcoBuild API.")
        })
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Servidor rodando na porta ${this.port}`)
        })
    }

    sockets() {
        const socket = new SocketConfig()
        socket.initialize(this.server)

    }

    middlewares() {

        this.app.use(cors({
            origin: `${process.env.APP_URL ? process.env.APP_URL :"http://localhost:5173"}`, // Permite rigens
            methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
            allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
            // credentials: true
        }))

        // Servindo arquivos estaticos 
        this.app.use('/files', express.static(path.join(__dirname, '../Files')));

        // Tratamento de Erros
        this.app.use(
            async(
                error: HttpError,
                request: Request,
                response: Response,
                next: NextFunction
            ) => {

                // Seta o HTTP Status Code
                response.status(error.status || 500);

                // Deletando arquivos no caso de Houver
                // algum erro durante a requisição
                if (error.status != 200 && request.file){
                    await deleteFile(String(request.file?.filename));
                }

                // Deletando a lista de arquivos no caso de Houver
                // algum erro durante a requisição
                if (request.files) {
                    Object.values(request.files).forEach(file => {
                        if (file[0])
                            deleteFile(file[0].filename);

                        if (file)
                            deleteFile(file.filename);
                    });
                }

                // Erros internos (500)
                if (!error.status) {
                    console.error(error.stack)
                    return response.json({
                        status: error.status,
                        message: 'Houve um erro interno, tente novamente.',
                        stack: error.stack,
                    });
                }

                // Restantes Erros (400, 404...)
                return response.json({
                    status: error.status,
                    message: error.message,
                    stack: error.stack,
                });
            }

        );
        
    }
}