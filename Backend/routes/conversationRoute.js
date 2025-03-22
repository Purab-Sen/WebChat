import { Router } from "express";
import {conversationCreator,getConversation} from "../Controllers/conversationHandler.js"

const route = Router();

route.post("/add",conversationCreator)
route.post("/get",getConversation)

export default route;