import {LOGIN_ROUTE, CHAT_ROUTE} from '../utils/constants.js';
import Login from '../pages/Login.jsx';
import Chat from '../pages/Chat.jsx';

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login/>,
    }
]

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        element: <Chat/>,
    }
]