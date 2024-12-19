import express, { Express, Request, Response, NextFunction } from "express";
import { Server as HttpServer, createServer } from "node:http";
import createHttpError, { HttpError } from "http-errors";
import dotenv from "dotenv";
import { routes } from "../Routes/index";
import { deleteFile } from "../helpers/deleteFile";
import SocketConfig from "../sockets";
import cors from "cors";
import path from "node:path";

dotenv.config();

export class Application {
    public app: Express;
    public server: HttpServer;
    private port: number;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.middlewares();
        this.routes();

        // Inicialize o SocketConfig diretamente no construtor
        this.initializeSockets();

        this.port = Number(process.env.PORT) || 4422;
    }

    routes() {
        this.app.use(routes);
        // this.app.use(express.static(path.join(__dirname, "dist")));

        // this.app.get("*", (Request, Response) => {
        //     Response.sendFile(path.join(__dirname, "dist", "index.html"));
        // });

        // Rota padrão
        this.app.get("/", (Request, Response) => {
            Response.send("WELCOME TO EcoBuild API.");
        });
    }

    async start() {
        this.server.listen(this.port, () => {
            console.log(`Servidor rodando na porta ${this.port}`);
        });
    }

    initializeSockets() {
        SocketConfig.initialize(this.server);
    }

    middlewares() {
        this.app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }));

        // Servindo arquivos estáticos
        this.app.use('/files', express.static(path.join(__dirname, '../Files')));

        // this.app.get('/*', (req: Request, res: Response) => {
        //     res.sendFile(path.join(__dirname, 'dist', 'index.html'))
        // })

        // Tratamento de Erros
        this.app.use(async (
            error: HttpError,
            request: Request,
            response: Response,
            next: NextFunction
        ) => {
            response.status(error.status || 500);

            // Deletando arquivos em caso de erro
            if (error.status != 200 && request.file) {
                await deleteFile(String(request.file?.filename));
            }

            if (request.files) {
                Object.values(request.files).forEach(file => {
                    if (file[0]) deleteFile(file[0].filename);
                    if (file) deleteFile(file.filename);
                });
            }

            if (!error.status) {
                console.error(error.stack);
                return response.json({
                    status: error.status,
                    message: 'Houve um erro interno, tente novamente.',
                    stack: error.stack,
                });
            }

            return response.json({
                status: error.status,
                message: error.message,
                stack: error.stack,
            });
        });
    }
}
