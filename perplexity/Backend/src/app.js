import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import chatRouter from "./routes/chat.routes.js";
import handleError from "./middleware/handleError.js"
import cors from 'cors'



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth' ,authRouter)
app.use('/api/chat', chatRouter)

app.use(handleError)

export default app;