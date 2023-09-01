import {useContext} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import {Context} from '@/context/index.js';
import getDateTime from '@/utils/getDateTime.js';

const ChatListItem = ({variant, displayName, createdAt, text, uid}) => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    const isYou = user.uid === uid;
    const isSent = variant === 'sent';
    const datetime = getDateTime(createdAt);

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{mb: 0.25}}
            >
                <Typography level="body-xs">
                    {isYou ? 'You' : displayName}
                </Typography>
                <Typography level="body-xs">
                    {datetime}
                </Typography>
            </Stack>
            <Box sx={{position: 'relative'}}>
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
                        wordBreak: 'break-all',
                    }}
                >
                    {text}
                </Sheet>
            </Box>
        </Box>

    );
};

export default ChatListItem;
