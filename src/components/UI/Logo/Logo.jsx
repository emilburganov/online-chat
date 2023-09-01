import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/joy/Stack';
import {Link} from 'react-router-dom';

const Logo = () => {
    return (
        <Stack direction="row" spacing={{xs: 1, md: 2}} alignItems="center">
            <Link to="/">
                <Typography
                    fontWeight="lg"
                    fontSize="22px"
                    component="h2"
                    noWrap
                >
                    OnlineChat
                </Typography>
            </Link>
        </Stack>
    );
};

export default Logo;