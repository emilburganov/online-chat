import {useColorScheme} from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const ColorSchemeToggle = ({onClick, sx, ...props}) => {
    const {mode, setMode} = useColorScheme();

    return (
        <IconButton
            id="toggle-mode"
            size="md"
            variant="plain"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...props}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
        >
            {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
};

export default ColorSchemeToggle;