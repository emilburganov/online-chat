import React, {useContext} from 'react';
import {Context} from '@/main.jsx';
import {useAuthState} from 'react-firebase-hooks/auth';
import MessagesPane from '@/components/Chat/MessagesPane.jsx';
import {chats} from '@/data.js';

const Chat = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);

    const [selectedChat, setSelectedChat] = React.useState(chats[0]);

    return (
        <MessagesPane chat={selectedChat}/>
    );
};

export default Chat;