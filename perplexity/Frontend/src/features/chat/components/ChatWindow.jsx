import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'


const ChatWindow = ({handleNewChat}) => {

    const messages = useSelector((state) => state.chat.messages)
    const chats = useSelector((state) => state.chat.chats)
    const currentChat = useSelector((state) => state.chat.currentChat)


    if (chats.length === 0 || currentChat===null) {
        return (

            <div className="welcome-message">
                <div className="message">
                    <div className="content">How can I help you today?</div>
                    <p>Select a chat or Click on New Chat to start</p>
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
            {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant'

                return (
                    <div key={msg._id || msg.id} className={`message ${msg.role}`}>
                        <div className="content">
                            {isAssistant ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    components={{
                                        table: ({ children }) => (
                                            <div className="md-table-wrap">
                                                <table>{children}</table>
                                            </div>
                                        )
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            ) : (
                                msg.content
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default ChatWindow
