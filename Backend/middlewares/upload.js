import {GridFsStorage} from "multer-gridfs-storage"
import { configDotenv } from "dotenv"
import multer from "multer";

configDotenv();

const storage = new GridFsStorage({
    url:process.env.CONN_STRING,
    file:(req,file) =>{
        const match = ["image/png","image/jpg"];
        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-file-${file.originalname}`
        }
        return {
            bucketName:"photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }

});

export default multer({storage});