import express from "express";
import { sendMessageController, getChats, getMessages, deleteChat } from "../controllers/chat.controller.js"
import { authUser } from "../middleware/auth.middleware.js";

const chatRouter = express.Router()


chatRouter.post('/sendMessage', authUser, sendMessageController)
chatRouter.get('/getChats', authUser, getChats)
chatRouter.get('/getMessages/:chatId', authUser, getMessages)
chatRouter.delete('/deleteChat/:chatId', authUser, deleteChat)

export default chatRouter