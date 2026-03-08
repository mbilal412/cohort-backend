import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import FaceExpression from "./feature/expression/components/FaceExpression"
import './feature/shared/global.scss'
import { AuthProvider } from './feature/auth/auth.context'
import { SongContextProvider } from './feature/Home/Song.context'



function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
