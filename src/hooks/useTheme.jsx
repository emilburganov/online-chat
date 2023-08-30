import React from 'react';
import {createTheme, useMediaQuery} from '@mui/material';

const useTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
};

export default useTheme;