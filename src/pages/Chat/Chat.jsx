import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ConversationAPI } from '../../api/ConversationApi';
import ChatContainer from '../../components/ChatComponents/ChatContainer/ChatContainer';
import { addNewMessageSocket, createConversation, getConversations, removeExistingMessageSocket, resetConversations, resetNewMessage, selectCurrentConversation, setMessageForDeletion } from '../../redux/Chat/ChatActions';

const Chat = ({currentUser, token, conversations, getConversations, resetConversations, currentConversation, resetCurrentConversation, newMessage, resetNewMessage, messageForDeletion, setMessageForDeletion, ...props}) => {
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        getConversations(currentUser._id, token);
        return () => resetConversations();
    }, []);

    const createNewConversation = async (userId) => {
        const res = await ConversationAPI.create({senderId: currentUser._id, receiverId: userId}, token);
        props.createConversation(currentUser._id, res);
        navigate(`./${res.conversation._id}`);
    }

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', data => {
            console.log(data);
            if(data) props.addNewMessageSocket(data);
        })
        socket.current.on('getMessageIdForDeletion', data => {
            if(data) props.removeExistingMessageSocket(data);
        })
    }, []);

    const getOnlineCandidates = (followings, conversations) => {
        if(!conversations) return followings;
        const conversationUsers = conversations.map(c => c.user);
        let map = new Map();
        let candidates = followings.concat(conversationUsers);
        candidates.forEach(item => {if(!map.has(item._id)) map.set(item._id, item)});
        return Array.from(map.values());
    }

    useEffect(()=>{
        socket.current.emit('addChatUser', currentUser._id);
        const allUsers = getOnlineCandidates(currentUser.followings, conversations);
        socket.current.on('getChatUsers', (users) => {
            setOnlineUsers(allUsers.filter(f => users.some(u => u.userId === f._id)));
        })
        return () => setOnlineUsers([]);
    }, [currentUser, conversations]);

    useEffect(()=>{
        if(newMessage && conversations){
            const reqConversation = conversations?.find(c => c._id === currentConversation )
            const receiver = reqConversation.user;
            socket.current.emit('addMessage', {receiverId: receiver._id, message: newMessage})
            resetNewMessage();
        }
    }, [newMessage, conversations, resetNewMessage]);

    useEffect(()=>{
        if(messageForDeletion && conversations){
            const reqConversation = conversations?.find(c => c._id === currentConversation )
            const receiver = reqConversation.user;
            socket.current.emit('removeMessage', {receiverId: receiver._id, messageId: messageForDeletion})
            setMessageForDeletion(null);
        }
    }, [messageForDeletion, conversations, setMessageForDeletion]);

    return <ChatContainer currentUser={currentUser} token={token} conversations={conversations} currentConversation={currentConversation} 
    selectCurrentConversation={props.selectCurrentConversation} createNewConversation={createNewConversation} onlineUsers={onlineUsers}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        online: state.auth.onlineUsers,
        conversations: state.chat.conversations,
        currentConversation: state.chat.currentConversation,
        newMessage: state.chat.newMessage,
        messageForDeletion: state.chat.messageForDeletion,
        isFetching: state.chat.isFetching,
        error: state.chat.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: (id, token) => {dispatch(getConversations(id, token))},
        createConversation: (id, conversation) => {dispatch(createConversation(id, conversation))},
        selectCurrentConversation: (conversation) => {dispatch(selectCurrentConversation(conversation))},
        resetConversations: () => {dispatch(resetConversations())},
        resetNewMessage: () => {dispatch(resetNewMessage())},
        setMessageForDeletion: (messageId) => {dispatch(setMessageForDeletion(messageId))},
        addNewMessageSocket: (data) => {dispatch(addNewMessageSocket(data))},
        removeExistingMessageSocket: (messageId) => {dispatch(removeExistingMessageSocket(messageId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);