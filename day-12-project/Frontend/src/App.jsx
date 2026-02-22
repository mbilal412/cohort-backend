import React from 'react'
import { RouterProvider } from 'react-router';
import { routes } from './routes';
import { AuthProvider } from './feature/auth/auth.context';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
    
  )
}

export default App
