import { generateTitle, generateResponse } from '../services/ai.service.js'
import messageModel from '../models/message.model.js'
import chatModel from '../models/chat.model.js'
import mongoose from 'mongoose'
export const sendMessageController = async (req, res) => {

    const { message, chatId } = req.body


    let title = null, chat = null

    if (!chatId) {
        title = await generateTitle(message)
        chat = await chatModel.create({
            userId: req.user.id,
            title
        })
        
    }

    const userMessage = await messageModel.create({
        role: 'user',
        content: message,
        chatId : chatId || chat._id
    })

    const messages = await messageModel.find({ chatId : chatId || chat._id });

    const response = await generateResponse(messages)

    const aiMessage = await messageModel.create({
        role: 'assistant',
        content: response,
        chatId : chatId || chat._id
    })

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        title,
        chat,
        aiMessage
    })
}

export const generateTitleController = async (req, res) => {
    const {chatId} = req.params
    const {message} = req.body

    const chat = await chatModel.findOne({
        _id: chatId,
        userId: req.user.id
    })

    if(!chat){
        const error = new Error("Chat not found")
        error.statusCode = 404
        throw error
    }
    const title = await generateTitle(message)
    chat.title = title
    await chat.save()
    res.status(200).json({
        success: true,
        title
    })
}


export const newChatController = async (req, res) => {
    const chat = await chatModel.create({
        userId: req.user.id,
        title: "New Chat"
    })
    res.status(201).json({
        success: true,
        chat
    })
}


export const getChats = async (req, res) => {
    const chats = await chatModel.find({ userId: req.user.id })
    res.status(200).json({
        success: true,
        chats
    })
}

export const getMessages = async (req, res) => {
    const { chatId } = req.params

    const chat = await chatModel.findOne({
        _id: chatId,
        userId: req.user.id
    })

    if (!chat) {
        const error = new Error("Chat not found")
        error.statusCode = 404
        throw error
    }

    const messages = await messageModel.find({ chatId })
    res.status(200).json({
        success: true,
        messages
    })
}

export const deleteChat = async (req, res) => {
    const {chatId} = req.params
    
    const chat = await chatModel.findOne({
        _id: chatId,
        userId: req.user.id
    })

    if (!chat) {
        const error = new Error("Chat not found")
        error.statusCode = 404
        throw error
    }

    await chatModel.deleteOne({_id: chatId})

    await messageModel.deleteMany({chatId})

    res.status(200).json({
        success: true,
        message: "Chat deleted successfully"
    })
}
