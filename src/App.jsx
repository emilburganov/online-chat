import React, {useContext} from 'react';
import {Context} from '@/main.jsx';
import {BrowserRouter} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import {CssVarsProvider} from '@mui/joy/styles';
import Header from '@/components/Header.jsx';
import Loader from '@/components/UI/Loaders/Loader.jsx';
import AppRouter from '@/router/AppRouter';
import {useAuthState} from 'react-firebase-hooks/auth';
import '@/styles/App.css';

function App() {
    const {auth} = useContext(Context);
    const [user, isLoading, error] = useAuthState(auth);

    return (
            <CssVarsProvider defaultMode="system" disableTransitionOnChange>
                <CssBaseline/>
                {isLoading ?
                    <Loader/>
                    :
                    <BrowserRouter>
                        <Header/>
                        <AppRouter/>
                    </BrowserRouter>
                }
            </CssVarsProvider>
    );
}

export default App;
