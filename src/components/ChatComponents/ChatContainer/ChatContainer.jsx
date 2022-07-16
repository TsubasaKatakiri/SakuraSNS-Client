import React from 'react';
import { Route, Routes } from 'react-router-dom';
import classes from './ChatContainer.module.scss';
import ChatSearch from '../ChatSearch/ChatSearch';
import ChatBlank from './../ChatBlank/ChatBlank';
import ConversationsList from '../ConversationsList/ConversationsList';
import ChatOnline from '../ChatOnline/ChatOnline';
import CurrentChat from '../CurrentChat/CurrentChat';

const ChatContainer = ({currentUser, token, conversations, currentConversation, selectCurrentConversation, createNewConversation, onlineUsers}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <section className={classes.wrapper}>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.menu}>
                    <div className={classes.menuWrapper}>
                        <ChatSearch token={token} currentUser={currentUser} createConversation={createNewConversation}/>
                        <ConversationsList conversations={conversations} selectCurrentConversation={selectCurrentConversation} currentConversation={currentConversation} isDark={isDark}/>
                    </div>
                </div>
                <div className={classes.chatbox}>
                    <Routes>
                        <Route path='/' element={<ChatBlank/>}/>
                        <Route path='/:conversationId' element={<CurrentChat/>}/>
                    </Routes>
                </div>
                <div className={classes.online}>
                    <ChatOnline onlineUsers={onlineUsers} createNewConversation={createNewConversation}/>
                </div>
            </div>
        </section>
    );
};

export default ChatContainer;