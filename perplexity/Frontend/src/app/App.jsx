import React, { useEffect } from 'react'
import { router } from './app.router.jsx'
import { RouterProvider } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth.js'

const App = () => {

  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()

  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App