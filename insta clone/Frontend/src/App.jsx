import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import './feature/shared/global.scss'
import PostContextProvider from './feature/post/post.context.jsx'
import UserContextProvider from './feature/user/user.context.jsx'
import AuthContextProvider from './feature/auth/auth.context.jsx'

function App() {

  return (
    <AuthContextProvider>
      <PostContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App

