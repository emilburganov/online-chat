import {useContext, useEffect, useState, useRef, forwardRef} from 'react';
import {addDoc, collection, orderBy, query, serverTimestamp} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Container} from '@mui/joy';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import {Context} from '@/context/index.js';
import Loader from '@/components/UI/Loader/Loader.jsx';
import MessageInput from '@/components/UI/Input/MessageInput.jsx';
import ChatList from '@/components/Chat/ChatList.jsx';

const Chat = () => {
    const [textAreaValue, setTextAreaValue] = useState('');

    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);

    const messagesEndRef = useRef(null)

    const [messages, loading] = useCollectionData(
        query(
            collection(firestore, 'messages'),
            orderBy('createdAt'),
        ),
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const sendMessage = async () => {
        await addDoc(collection(firestore, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: textAreaValue,
            createdAt: serverTimestamp(),
        });
    };

    if (loading) {
        return <Loader/>;
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
                    py: 2,
                    overflowY: 'scroll',
                    flexDirection: 'column',
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    <ChatList messages={messages}/>
                </Stack>
                <MessageInput
                    textAreaValue={textAreaValue}
                    setTextAreaValue={setTextAreaValue}
                    onSubmit={sendMessage}
                />
                <div ref={messagesEndRef}></div>
            </Box>
        </Container>
    );
};

export default Chat;