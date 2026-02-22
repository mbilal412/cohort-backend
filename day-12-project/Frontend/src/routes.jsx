import {createBrowserRouter} from 'react-router';
import Login from './feature/auth/pages/Login';
import Register from './feature/auth/pages/Register';

export const routes = createBrowserRouter([

    {
        path: '/',
        element: <h1>Home</h1>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />,
    }
])
    