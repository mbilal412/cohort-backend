import React from 'react'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const ChatInput = ({ input, setInput, handleClickSend }) => {
    const textareaRef = useRef(null)

    const chats = useSelector((state) => state.chat.chats)

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.style.height = 'auto'           // pehle reset karo
        textarea.style.height = `${textarea.scrollHeight}px`  // phir content ke hisaab se set karo
    }, [input])


    const handleKeyDown = (e) => {
        // Enter without Shift = Send
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleClickSend()
        }

        // Arrow Down on empty or at last line = block
        if (e.key === 'ArrowDown') {
            const textarea = e.target
            const text = textarea.value
            const cursorPos = textarea.selectionStart

            // Check karo cursor last line pe hai ya nahi
            const textAfterCursor = text.substring(cursorPos)
            const isOnLastLine = !textAfterCursor.includes('\n')

            if (isOnLastLine) {
                e.preventDefault()
            }
        }
    }


    if(chats.length === 0){
        return null
    }

    return (
        <div className="input-container">
            <textarea
                ref={textareaRef}
                placeholder="Ask Nexus AI anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
            />
            <button onClick={handleClickSend} className="send-btn" >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
            </button>
        </div>
    )
}

export default ChatInput