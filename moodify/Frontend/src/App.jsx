import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import FaceExpression from "./feature/expression/components/FaceExpression"
import './feature/shared/global.scss'
import { AuthProvider } from './feature/auth/auth.context'



function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
