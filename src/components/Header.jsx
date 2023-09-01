import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import {Button, Container} from '@mui/joy';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import {Context} from '@/context/index';
import {LOGIN_ROUTE} from '@/utils/constants';
import ColorSchemeToggle from '@/components/UI/Button/ColorSchemeToggle';
import Logo from '@/components/UI/Logo/Logo';

const Header = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    const logout = () => {
        auth.signOut();
    };

    return (
        <Box sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
        }}>
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    py={2}
                >
                    <Logo/>
                    <Stack spacing={1} direction="row" alignItems="center">
                        {user ?
                            <Button onClick={logout}>
                                Logout
                            </Button>
                            :
                            <Button component={Link} to={LOGIN_ROUTE}>
                                Login
                            </Button>
                        }
                        <ColorSchemeToggle/>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Header;