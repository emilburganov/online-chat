import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {LOGIN_ROUTE} from '@/utils/constants.js';
import {Context} from '@/main.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useContext} from 'react';
import Stack from '@mui/joy/Stack';
import {Button} from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Sheet from '@mui/joy/Sheet';
import ColorSchemeToggle from '@/components/UI/Buttons/ColorSchemeToggle.jsx';

const Header = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    const logout = () => {
        auth.signOut();
    };

    return (
        <Sheet>
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
                py={2}
                px={2}
            >
                <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center">
                    <Avatar size="lg"/>
                    <div>
                        <Typography
                            fontWeight="lg"
                            fontSize="lg"
                            component="h2"
                            noWrap
                        >
                            Emil Burganov
                        </Typography>

                        <Typography level="body-sm">
                            @emilburganov
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
        </Sheet>
    );
};

export default Header;