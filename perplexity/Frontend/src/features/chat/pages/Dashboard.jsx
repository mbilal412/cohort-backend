import React, { useEffect, useState } from 'react'
import { useChat } from '../hooks/useChat'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import ChatInput from '../components/ChatInput'
import '../style/chat.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setCurrentChat, addMessage, setMessages, updateChatTitle } from '../chat.slice'


const Dashboard = () => {

  const dispatch = useDispatch()


  const currentChatId = useSelector((state) => state.chat.currentChat)
  const sidebarChats = useSelector((state) => state.chat.chats)
  const messages = useSelector((state) => state.chat.messages)

  const chat = useChat()
  const [input, setInput] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    chat.initializeSocketConnection()

    const fetchChats = async () => {
      await chat.handleGetChats()
    }
    fetchChats()
  }, [])

  const handleClickChat = async (chatId) => {
    await chat.handleGetMessages(chatId)
    dispatch(setCurrentChat(chatId))
  }

  const handleClickSend = async () => {

    const isNewChat = messages.length === 0

    if(isNewChat){
      const title = await chat.handleGenerateTitle({message: input, chatId: currentChatId})
      dispatch(updateChatTitle({title, chatId: currentChatId}))
    }

    if (input.trim() === '') return
    const msg = {
      role: 'user',
      content: input
    }

    dispatch(addMessage(msg))
    setInput('')
    const test = await chat.handleSendMessage({ message: input, chatId: currentChatId })
  }

  const handleNewChat = async () => {
    await chat.handleNewChat()
    dispatch(setMessages([]))
  }



  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="chat-layout">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar: History and New Chat */}
      <Sidebar isSidebarOpen={isSidebarOpen} handleNewChat={handleNewChat} handleClickChat={handleClickChat} />

      {/* Main Chat Panel */}
      <main className="chat-main">
        <header className="chat-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h2>Nexus AI</h2>
        </header>

        <ChatWindow handleNewChat={handleNewChat} />

        {/* Floating Input Area */}
        <div className="input-wrapper">
          <ChatInput input={input} setInput={setInput} handleClickSend={handleClickSend} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
