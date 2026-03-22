import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import VerifyEmail from "../features/auth/pages/verifyEmail";
import VerifiedEmail from "../features/auth/pages/verifiedEmail";
import Dashboard from "../features/chat/pages/Dashboard";
import ProtectedRoute from "../shared/component/ProtectedRoute";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    },

    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />
    },
    {
        path: "/verified-email",
        element: <VerifiedEmail />
    }
])