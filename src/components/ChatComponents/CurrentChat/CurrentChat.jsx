import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessage, getCurrentConversation, removeMessage, resetCurrentConversation, selectCurrentConversation } from '../../../redux/Chat/ChatActions';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import Message from '../Message/Message';
import MessageForm from '../MessageForm/MessageForm';
import classes from './CurrentChat.module.scss';

const CurrentChat = ({currentUser, token, messages, isFetching, error, removeMessage, addMessage, selectConversation, getConversation, resetConversation, ...props}) => {
    const conversationId = useParams().conversationId;
    const scrollRef = useRef();

    useEffect(()=>{
        selectConversation(conversationId);
        getConversation(conversationId, token);
        return resetConversation();
    }, [conversationId]);

    useEffect(() => {
        if(messages) scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
    }, [messages]);

    return (
        <section className={classes.wrapper}>
            <div className={classes.messages}>
                {(!messages || isFetching) && !error 
                    ? <Preloader/>
                    : <>{!messages && error 
                            ? <span className={classes.notice}>{error}</span>
                            : <>{
                                messages.length === 0 
                                ? <span className={classes.notice}>Currently there is no messages here. So, let's start chat!</span>
                                : <>{messages.map(m => {
                                        return <div ref={scrollRef} key={m._id}>
                                            <Message message={m} own={m.sender._id === currentUser._id} removeMessage={removeMessage} currentUser={currentUser} token={token}/>
                                        </div>
                                    })}</>
                            }</>
                        }</>
                }
            </div>
            <MessageForm addMessage={addMessage} currentUser={currentUser} token={token} conversationId={conversationId} currentConversation={props.currentConversation}/>
        </section>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        conversation: state.chat.currentConversation,
        messages: state.chat.currentConversationMessages,
        isFetching: state.chat.isFetching,
        error: state.chat.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversation: (conversationId, token) => {dispatch(getCurrentConversation(conversationId, token))},
        selectConversation: (conversation) => {dispatch(selectCurrentConversation(conversation))},
        addMessage: (message, token) => {dispatch(addMessage(message, token))},
        removeMessage: (messageId, userId, token) => {dispatch(removeMessage(messageId, userId, token))},
        resetConversation: () => {dispatch(resetCurrentConversation())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentChat);