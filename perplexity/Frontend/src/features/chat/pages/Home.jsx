import React, { useEffect } from 'react'
import { useChat } from '../hooks/useChat'

const Home = () => {

  const chat = useChat()

  useEffect(() => {
    chat.initializeSocketConnection()
  }, [])
  

  return (
    <div>Home</div>
  )
}

export default Home