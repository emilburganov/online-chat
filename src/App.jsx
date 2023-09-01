import React, {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Context} from '@/context/index';
import {CssBaseline} from '@mui/material';
import {CssVarsProvider} from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Header from '@/components/Header';
import Loader from '@/components/UI/Loader/Loader';
import AppRouter from '@/router/AppRouter';
import {useAuthState} from 'react-firebase-hooks/auth';
import '@/styles/App.css';

function App() {
    const {auth} = useContext(Context);
    const [user, isLoading, error] = useAuthState(auth);

    return (
        <CssVarsProvider defaultMode="system" disableTransitionOnChange>
            <CssBaseline/>
            <Sheet>
                {isLoading ?
                    <Loader/>
                    :
                    <BrowserRouter>
                        <Header/>
                        <AppRouter/>
                    </BrowserRouter>
                }
            </Sheet>
        </CssVarsProvider>
    );
}

export default App;
