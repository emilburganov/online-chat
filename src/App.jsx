import React, {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {CssBaseline} from '@mui/material';
import {CssVarsProvider} from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import {Context} from '@/context/index';
import AppRouter from '@/router/AppRouter';
import Header from '@/components/Header';
import Loader from '@/components/UI/Loader/Loader';
import '@/styles/App.css';

function App() {
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return (
        <CssVarsProvider defaultMode="system" disableTransitionOnChange>
            <CssBaseline/>
            <Sheet>
                {loading ?
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
