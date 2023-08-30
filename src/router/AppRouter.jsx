import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from './Routes.jsx';
import Login from '@/pages/Login.jsx';
import Chat from '@/pages/Chat.jsx';
import {Context} from '@/main.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';

const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return user ?
        (
            <Routes>
                {privateRoutes.map((route) =>
                    <Route key={route.path} {...route}></Route>,
                )}
                <Route path="*" element={<Chat/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map((route) =>
                    <Route key={route.path} {...route}></Route>,
                )}
                <Route path="*" element={<Login/>}/>
            </Routes>
        );
};

export default AppRouter;