import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import './feature/shared/global.scss'
import PostContextProvider from './feature/post/post.context.jsx'

function App() {

  return (
    <PostContextProvider>
      <RouterProvider router={router} />
    </PostContextProvider>
  )
}

export default App

