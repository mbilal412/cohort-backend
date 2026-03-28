import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
})


export const sendMessage = async ({ message, chatId, onEvent }) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat/sendMessage`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, chatId })
    })

    if(!response.ok || !response.body){
        throw new Error('Network response was not ok')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let buffer = ''

    while(true){
        const {value, done} = await reader.read()
        if(done) break

        buffer += decoder.decode(value, {stream: true})

        const event = buffer.split('\n\n')

        buffer = event.pop() || ''


        event.forEach(e =>{
            const lines = e.split('\n')
            const eventLine = lines.find(l => l.startsWith('event: '))
            const dataLine = lines.find(l => l.startsWith('data: '))

            if(!eventLine || !dataLine) return

            const eventName = eventLine.replace('event: ', '')
            const data = JSON.parse(dataLine.replace('data: ', ''))


            if(typeof onEvent === 'function'){
                onEvent(eventName, data)
            }
        })
        
    }

    return true
}

export const generateTitle = async ({message, chatId}) => {
    const response = await api.post(`/api/chat/generateTitle/${chatId}`,{
        message
    })
    return response.data
}

export const newChat = async () => {
    const response = await api.post(`/api/chat/newChat`)
    return response.data
}

export const getChats = async () => {
    const response = await api.get(`/api/chat/getChats`)
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/chat/getMessages/${chatId}`)
    return response.data
}

export const deleteChat = async (chatId) => {
    const response = await api.delete(`/api/chat/deleteChat/${chatId}`)
    return response.data
}