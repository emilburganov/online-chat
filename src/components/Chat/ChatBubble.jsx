import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import {Context} from '@/main.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useContext} from 'react';
import getDateTime from '@/utils/getDateTime.js';

const ChatBubble = ({variant, displayName, createdAt, text, uid}) => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    const isYou = user.uid === uid;
    const isSent = variant === 'sent';

    const timestamp = createdAt.seconds * 1000;
    const datetime = getDateTime(timestamp);

    return (
        <Box sx={{maxWidth: '80%', minWidth: 'auto'}}>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{mb: 0.25}}
            >
                <Typography level="body-xs">
                    {isYou ? 'You' : displayName}
                </Typography>
                <Typography level="body-xs">
                    {datetime}
                </Typography>
            </Stack>
            <Box
                sx={{ position: 'relative' }}
            >
                <Sheet
                    color={isSent ? 'primary' : 'neutral'}
                    variant={isSent ? 'solid' : 'soft'}
                    sx={{
                        px: 1.25,
                        py: 1.25,
                        borderRadius: 'lg',
                        borderTopRightRadius: isSent ? 0 : 'lg',
                        borderTopLeftRadius: isSent ? 'lg' : 0,
                        overflow: 'hidden',
                        wordBreak: 'break-all'
                    }}
                >
                    {text}
                </Sheet>
            </Box>
        </Box>
    );
};

export default ChatBubble;
