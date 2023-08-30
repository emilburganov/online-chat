import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {LOGIN_ROUTE} from '@/utils/constants.js';
import {Context} from '@/main.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useContext} from 'react';
import Stack from '@mui/joy/Stack';
import {Button, Container} from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import ColorSchemeToggle from '@/components/UI/Buttons/ColorSchemeToggle.jsx';

const Header = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    const logout = () => {
        auth.signOut();
    };

    return (
        <Sheet sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
        }}>
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    py={2}
                >
                    <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center">
                        <div>
                            <Typography
                                fontWeight="lg"
                                fontSize="22px"
                                component="h2"
                                noWrap
                            >
                                OnlineChat
                            </Typography>
                        </div>
                    </Stack>
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
        </Sheet>
    );
};

export default Header;