import multer, { diskStorage } from "multer";
import { resolve } from "path";


// Define o diretório onde os arquivos serão armazenados
const uploadsDest = resolve(__dirname, "../Files");

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDest); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        // Usando o nome original do arquivo e adicionando um timestamp
        cb(null, `ecobuild_${Date.now()}-${file.originalname}`);
    }
});

// Inicializa o multer com a configuração de armazenamento
const upload = multer({ storage: storage });

export default upload;
