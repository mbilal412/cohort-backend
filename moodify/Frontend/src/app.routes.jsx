import {createBrowserRouter} from 'react-router'
import Login from './feature/auth/pages/Login'
import Register from './feature/auth/pages/Register'
import Home from './feature/Home/page/Home'
import Protected from './feature/auth/Component/Protected'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><Home/></Protected>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    }
])