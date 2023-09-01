import {Box, CircularProgress} from '@mui/joy';

const Loader = () => {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'100vh'}
            sx={{backgroundColor: 'primary'}}
        >
            <CircularProgress variant={'plain'} color={'neutral'} />
        </Box>
    );
};

export default Loader;