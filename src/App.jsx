import React, {useContext} from 'react';
import {Context} from '@/main.jsx';
import {BrowserRouter} from 'react-router-dom';
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material';
import {CssVarsProvider} from '@mui/joy/styles';
import Header from '@/components/Header.jsx';
import Loader from '@/components/UI/Loaders/Loader.jsx';
import AppRouter from '@/router/AppRouter';
import {useAuthState} from 'react-firebase-hooks/auth';
import '@/styles/App.css';

function App() {
    const {auth} = useContext(Context);
    const [user, isLoading, error] = useAuthState(auth);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssVarsProvider disableTransitionOnChange>
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
        </ThemeProvider>
    );
}

export default App;
