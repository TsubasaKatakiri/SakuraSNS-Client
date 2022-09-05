import React from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import Conversation from './Conversation/Conversation';
import classes from './ConversationsList.module.scss';

const ConversationsList = ({conversations, selectCurrentConversation, currentConversation}) => {
    const navigate = useNavigate();
    const setCurrentChat = (chat) => {
        selectCurrentConversation(chat._id);
        navigate(`./${chat._id}`);
    }

    if(!conversations) return <Preloader/>;

    return (
        <section className={classes.list}>
            {conversations.map(c => {
                return  <div onClick={() => setCurrentChat(c)} key={c._id}>
                    <Conversation user={c.user} current={currentConversation} conversationId={c._id}/>
                </div>
            })}
        </section>
    );
};

export default ConversationsList;