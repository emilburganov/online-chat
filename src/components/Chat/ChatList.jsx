import {useContext} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import Stack from '@mui/joy/Stack';
import {Avatar} from '@mui/joy';
import {AnimatePresence, motion} from 'framer-motion';
import {Context} from '@/context/index.js';
import ChatListItem from '@/components/Chat/ChatListItem.jsx';

const ChatList = ({messages}) => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <AnimatePresence initial={false} mode="popLayout">
            {messages.map((message, index) => {
                const isYou = user.uid === message.uid;

                return (
                    <Stack
                        key={index}
                        direction="row"
                        spacing={2}
                        flexDirection={isYou ? 'row-reverse' : 'row'}
                    >
                        {!isYou && <Avatar src={message.photoURL}/>}
                        <motion.div
                            layout
                            initial={{maxWidth: '80%', opacity: 0, scale: 0.8}}
                            animate={{maxWidth: '80%', opacity: 1, scale: 1}}
                            exit={{maxWidth: '80%', opacity: 0, scale: 0.8}}
                            transition={{
                                opacity: {duration: 0.2},
                                layout: {
                                    type: 'spring',
                                    bounce: 0.4,
                                    duration: 1,
                                },
                            }}
                        >
                            {message.createdAt && <ChatListItem
                                {...message}
                                variant={isYou ? 'sent' : 'received'}
                            />}
                        </motion.div>
                    </Stack>
                );
            })}
        </AnimatePresence>
    );
};

export default ChatList;