import express from "express";
import { configDotenv } from "dotenv";
import loginroute from "./routes/loginRoute.js"
import contactRoute from "./routes/contactRoute.js";
import createConnection from "./config/db.js";
import conversationRoute from "./routes/conversationRoute.js"
import messageRoute from "./routes/messageRoute.js"
import logOutRoute from "./routes/logOutRoute.js"
import cors from "cors"
import fileRoute from "./routes/fileRoute.js"
import cookieParser from "cookie-parser";
import authenticateUser from "./middlewares/authenticator.js";

configDotenv();
createConnection();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(authenticateUser);

app.use('/login',loginroute);
app.use('/contacts',contactRoute);
app.use('/conversation',conversationRoute);
app.use('/message',messageRoute);
app.use('/file',fileRoute);
app.use('/logout',logOutRoute)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})