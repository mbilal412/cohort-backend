import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import './feature/shared/global.scss'
import PostContextProvider from './feature/post/post.context.jsx'
import UserContextProvider from './feature/user/user.context.jsx'

function App() {

  return (
    <PostContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </PostContextProvider>
  )
}

export default App

