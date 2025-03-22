import { Router } from "express";
import logOutController from "../Controllers/logoutController.js";

const router = Router();

router.get("/",logOutController)

export default router;