import {useContext, useEffect, useState} from 'react';
import {Container} from '@mui/joy';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import {Context} from '@/main';
import MessageInput from '@/components/Chat/MessageInput.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import {addDoc, collection, getDocs, serverTimestamp, query, orderBy} from 'firebase/firestore';
import AvatarWithStatus from '@/components/Chat/AvatarWithStatus.jsx';
import Loader from '@/components/UI/Loaders/Loader.jsx';
import ChatBubble from '@/components/Chat/ChatBubble.jsx';

const Chat = () => {
    const [textAreaValue, setTextAreaValue] = useState('');

    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);

    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const fetchMessages = async () => {
        setLoading(true);
        await getDocs(collection(firestore, 'messages'))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data() }));
                setMessages(newData);
            })
        await setLoading(false)
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    if (isLoading) {
        return <Loader/>
    }

    const sendMessage = async () => {
        await addDoc(collection(firestore, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: textAreaValue,
            createdAt: serverTimestamp(),
        });
    };

    return (
        <Sheet>
            <Container sx={{
                height: {xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh'},
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            minHeight: 0,
                            px: 2,
                            py: 2.5,
                            overflowY: 'scroll',
                            flexDirection: 'column-reverse',
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
                                        <ChatBubble
                                            {...message}
                                            variant={isYou ? 'sent' : 'received'}
                                        />
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Box>
                    <MessageInput
                        textAreaValue={textAreaValue}
                        setTextAreaValue={setTextAreaValue}
                        onSubmit={sendMessage}
                    />
                </Stack>
            </Container>
        </Sheet>
    );
};

export default Chat;