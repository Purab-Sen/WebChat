import { Router } from "express";
import { newController,getMessages } from "../Controllers/messageController.js";

const route = Router();

route.post("/add",newController);
route.get("/get/:id",getMessages);

export default route;