import {useContext, useState} from 'react';
import MessageInput from '@/components/Chat/MessageInput.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import {collection, orderBy, query, addDoc, serverTimestamp} from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Container} from '@mui/joy';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import {Context} from '@/context/index.js';
import Loader from '@/components/UI/Loader/Loader.jsx';
import ChatBubble from '@/components/Chat/ChatBubble.jsx';
import AvatarWithStatus from '@/components/Chat/AvatarWithStatus.jsx';

const Chat = () => {
    const [textAreaValue, setTextAreaValue] = useState('');

    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);

    const [messages, isLoading] = useCollectionData(
        query(
            collection(firestore, 'messages'),
            orderBy('createdAt'),
        ),
    );

    const sendMessage = async () => {
        await addDoc(collection(firestore, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: textAreaValue,
            createdAt: serverTimestamp(),
        });
    };

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <Container sx={{
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 2.5,
                    overflowY: 'scroll',
                    flexDirection: 'column',
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {messages.map((message, index) => {
                        const isYou = user.uid === message.uid;

                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                flexDirection={isYou ? 'row-reverse' : 'row'}
                            >
                                {!isYou && (
                                    <AvatarWithStatus
                                        online={true}
                                        src={message.photoURL}
                                    />
                                )}
                                {message.createdAt && <ChatBubble
                                    {...message}
                                    variant={isYou ? 'sent' : 'received'}
                                />}
                            </Stack>
                        );
                    })}
                </Stack>
                <MessageInput
                    textAreaValue={textAreaValue}
                    setTextAreaValue={setTextAreaValue}
                    onSubmit={sendMessage}
                />
            </Box>
        </Container>
    );
};

export default Chat;