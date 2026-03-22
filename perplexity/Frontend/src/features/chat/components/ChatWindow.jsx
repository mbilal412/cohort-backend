import React from 'react'
import { useSelector } from 'react-redux'

const ChatWindow = ({handleNewChat}) => {

    const messages = useSelector((state) => state.chat.messages)
    const chats = useSelector((state) => state.chat.chats)


    if (chats.length === 0) {
        return (

            <div className="welcome-message">
                <div className="message">
                    <div className="content">How can I help you today?</div>
                    <p>Click on New Chat to start</p>
                    <button onClick={handleNewChat} className="new-chat-btn">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        New Chat
                    </button>
                </div>
            </div>
        )
    }
    // console.log(messages)
    return (
        <div className="messages-container">
            {messages.map((msg) => (

                <div key={msg.id} className={`message ${msg.role}`}>
                    <div className="content">{msg.content}</div>
                </div>


            ))}
        </div>
    )
}
export default ChatWindow
