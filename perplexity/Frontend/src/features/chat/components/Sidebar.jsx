import React from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Sidebar = ({ isSidebarOpen, handleNewChat, handleClickChat }) => {

  const { handleDeleteChat } = useChat()

  const handleDelete = (e, chatId) => {
    e.stopPropagation()
    handleDeleteChat(chatId)
  }

  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChat)

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="top">
        <button onClick={handleNewChat} className="new-chat-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Chat
        </button>
        <div className="history-list ">
          {chats.map(chat => (
            <div onClick={() => handleClickChat(chat._id)} key={chat._id} className={`history-item ${chat._id === currentChatId ? 'active' : ''}`}>{chat.title}
              <svg onClick={(e) => handleDelete(e, chat._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom">
        <button className='logout'>Logout</button>
      </div>
    </aside>
  )
}

export default Sidebar