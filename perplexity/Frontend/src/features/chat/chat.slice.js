import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",

    initialState: {
        chats: [],
        currentChat: null,
        messages: [],
        loading: false
    },

    reducers: {

        startStreamingAssistant: (state, action) => {
            const { tempId, chatId } = action.payload
            state.messages.push({
                _id: tempId,
                role: 'assistant',
                content: '',
                chatId,
                isStreaming: true
            })
        },

        appendStreamingChunk: (state, action) => {
            const { tempId, chunk } = action.payload
            const msg = state.messages.find(m => m._id === tempId)
            if (msg) {
                msg.content += chunk
            }
        },


        finalizeStreamingAssistant: (state, action) => {

            const { tempId, aiMessage } = action.payload

            const index = state.messages.findIndex(m => m._id === tempId)
            if (index !== -1) {
                state.messages[index] = aiMessage
            }

        },
        createNewChat: (state, action) => {
            const { _id, title, userId } = action.payload
            const newChat = { _id, title, userId }
            state.chats = [newChat, ...state.chats]
            state.currentChat = _id
            state.messages = []
        },

        updateChatTitle: (state, action) => {
            const { chatId, title } = action.payload

            const chat = state.chats.find(c => c._id === chatId)
            if (chat) {
                chat.title = title
            }
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        removeChat: (state, action) => {
            const { chatId } = action.payload
            state.chats = state.chats.filter(c => c._id !== chatId)
            state.currentChat = null
            state.messages = []
        }
    }
})


export const { setChats, setCurrentChat, setMessages, setLoading, addMessage, createNewChat, updateChatTitle, removeChat, startStreamingAssistant, appendStreamingChunk, finalizeStreamingAssistant } = chatSlice.actions
export default chatSlice.reducer