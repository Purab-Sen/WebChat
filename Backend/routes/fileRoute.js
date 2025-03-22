import { Router } from "express";
import { uploadFile,getImage } from "../Controllers/fileHandler.js";
import upload from "../middlewares/upload.js"

const route = Router();

route.post("/upload",upload.single("file"),uploadFile);
route.get("/:filename",getImage);

export default route;