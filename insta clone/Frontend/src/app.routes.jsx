import {createBrowserRouter} from 'react-router-dom'
import Register from './feature/auth/page/Register.jsx'
import Login from './feature/auth/page/Login.jsx'
import Feed from './feature/post/page/Feed.jsx'
import CreatePost from './feature/post/page/CreatePost.jsx'
import { Navigate } from 'react-router-dom'

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Navigate to='/login' />
        },
        
        {
            path: 'register',
            element: <Register />
        },
        {
            path: 'login',
            element: <Login/>

        },
        {
            path: 'feed',
            element: <Feed/>
        },
        {
            path: 'create-post',
            element: <CreatePost/>

        }
    ]
)

