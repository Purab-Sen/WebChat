import { Router } from "express";
import { getContacts } from "../Controllers/contactController.js";

const router = Router();

router.get("/",getContacts);

export default router;