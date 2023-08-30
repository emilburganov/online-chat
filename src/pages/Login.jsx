import React, {useContext} from 'react';
import {Box} from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import {Button} from '@mui/joy';
import {Context} from '@/main.jsx';
import GoogleIcon from '@/components/UI/Icons/GoogleIcon.jsx';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const Login = () => {
    const {auth} = useContext(Context);

    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    return (
        <Sheet>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight={'100vh'}
                padding={2}
            >
                <Button
                    sx={{maxWidth: '400px', width: '100%'}}
                    onClick={login}
                    variant="outlined"
                    color="neutral"
                    fullWidth
                    startDecorator={<GoogleIcon/>}
                >
                    Sign in with Google
                </Button>
            </Box>
        </Sheet>
    );
};

export default Login;