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
        chatId = chat._id
    }


    title = (await chatModel.findById(chatId).select('title -_id')).title

    const userMessage = await messageModel.create({
        role: 'user',
        content: message,
        chatId: chatId
    })

    const messages = await messageModel.find({ chatId });

    const response = await generateResponse(messages)

    const aiMessage = await messageModel.create({
        role: 'assistant',
        content: response,
        chatId: chatId
    })

    res.status(201).json({
        success: true,
        message: "Message sent successfully",
        title,
        chat,
        aiMessage
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

    await chatModel.deleteOne({chatId})

    await messageModel.deleteMany({chatId})

    res.status(200).json({
        success: true,
        message: "Chat deleted successfully"
    })
}





setChats((prev) => {
    return {
        ...prev,
        [chat.title]: {
            ...chat,
            messages: [{content: message, role: 'user'}, aiMessage]
        }
    }
})