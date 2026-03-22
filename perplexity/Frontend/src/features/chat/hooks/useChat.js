import { initializeSocketConnection } from "../services/chat.socket";
import { getChats, getMessages, sendMessage, newChat, generateTitle, deleteChat } from "../services/chat.service";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setCurrentChat, addMessage, setMessages, createNewChat, removeChat } from "../chat.slice";


export const useChat = () => {
    
    const dispatch = useDispatch()

    const messages = useSelector((state) => state.chat.messages)
    
    const handleSendMessage = async ({message, chatId}) => {
        try{
            const response = await sendMessage({message, chatId})
            dispatch(addMessage(response.aiMessage))
            return response
        }catch(error){
            console.log(error)
        }
    }

    const handleNewChat = async () => {
        try{
            const response = await newChat()
            dispatch(createNewChat(response.chat))
            return response.chat
        }catch(error){
            console.log(error)
        }
    }

    const handleGenerateTitle = async ({message, chatId}) => {
        try{
            const response = await generateTitle({message, chatId})
            // dispatch(generateTitle(response.title))
            return response.title
        }catch(error){
            console.log(error)
        }
    }

    const handleGetChats = async () => {
        try{
            const response = await getChats()
            dispatch(setChats(response.chats))
            return response.chats
        }catch(error){
            console.log(error)
        }
    }

    const handleGetMessages = async (chatId) => {
        try{
            const response = await getMessages(chatId)
            dispatch(setMessages(response.messages))
            return response.messages
        }catch(error){
            console.log(error)
        }
    }


    const handleDeleteChat = async (chatId) => {
        try{
            
            const response = await deleteChat(chatId)
            dispatch(removeChat({chatId}))
            return response
        }catch(error){
            console.log(error)
        }
    }


    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleGetMessages,
        handleNewChat,
        handleGenerateTitle,
        handleDeleteChat
    }
}