import { ChatAPI } from '../../api/ChatApi';
import { ConversationAPI } from '../../api/ConversationApi';
import { ADD_MESSAGE, ADD_MESSAGE_SOCKET, CREATE_NEW_CONVERSATION, GET_CONVERSATION_FAIL, GET_CONVERSATION_PROGRESS, GET_CONVERSATION_SUCCESS, GET_CURRENT_CONVERSATION_FAIL, GET_CURRENT_CONVERSATION_PROGRESS, GET_CURRENT_CONVERSATION_SUCCESS, REMOVE_MESSAGE, REMOVE_MESSAGE_SOCKET, RESET_CONVERSATIONS, RESET_CURRENT_CONVERSATION, RESET_NEW_MESSAGE, SELECT_CURRENT_CONVERSATION, SET_DELETION_MESSAGE } from './ChatTypes';

const startGetConversation = () => ({type: GET_CONVERSATION_PROGRESS});
const successGetConversation = (data) => ({type: GET_CONVERSATION_SUCCESS, payload: data});
const failGetConversation = () => ({type: GET_CONVERSATION_FAIL});
const createNewConversation = (conversation, isCreated) => ({type: CREATE_NEW_CONVERSATION, payload: {conversation, isCreated}});
const startGetCurrentConversation = () => ({type: GET_CURRENT_CONVERSATION_PROGRESS});
const successGetCurrentConversation = (data) => ({type: GET_CURRENT_CONVERSATION_SUCCESS, payload: data});
const failGetCurrentConversation = () => ({type: GET_CURRENT_CONVERSATION_FAIL});
const addNewMessage = (data) => ({type: ADD_MESSAGE, payload: data});
const removeExistingMessage = (messageId) => ({type: REMOVE_MESSAGE, payload: messageId});
export const selectCurrentConversation = (conversation) => ({type: SELECT_CURRENT_CONVERSATION, payload: conversation});
export const resetCurrentConversation = () => ({type: RESET_CURRENT_CONVERSATION});
export const resetConversations = () => ({type: RESET_CONVERSATIONS});
export const addNewMessageSocket = (data) =>({type: ADD_MESSAGE_SOCKET, payload: data});
export const removeExistingMessageSocket = (messageId) =>({type: REMOVE_MESSAGE_SOCKET, payload: messageId});
export const setMessageForDeletion = (messageId) => ({type: SET_DELETION_MESSAGE, payload: messageId});
export const resetNewMessage = () => ({type: RESET_NEW_MESSAGE});


export const getConversations = (userId, token) => async (dispatch) => {
    dispatch(startGetConversation());
    try{
        const res = await ConversationAPI.getAll(userId, token);
        const conversations = res.conversations; 
        conversations.map(i => i.user = i.members.filter(m => m._id !== userId)[0]);
        dispatch(successGetConversation(conversations));
    } catch (e){
        dispatch(failGetConversation());
    }
};

export const createConversation = (userId, res) => async (dispatch) => {
    try{
        const conversation = res.conversation;
        conversation.user = conversation.members.filter(m => m._id !== userId)[0];
        dispatch(createNewConversation(conversation, res.isCreated));
        dispatch(selectCurrentConversation(conversation._id));
    } catch (e){}
};

export const getCurrentConversation = (conversationId, token) => async (dispatch) => {
    dispatch(startGetCurrentConversation());
    try{
        const res = await ChatAPI.getAll(conversationId, token);
        dispatch(successGetCurrentConversation(res.messages));
        dispatch(selectCurrentConversation(conversationId));
    } catch (e){
        dispatch(failGetCurrentConversation());
    }
};

export const addMessage = (message, token) => async (dispatch) => {
    try{
        const res = await ChatAPI.create(message, token);
        dispatch(addNewMessage(res.msg));
    } catch (e){}
};

export const removeMessage = (messageId, userId, token) => async (dispatch) => {
    try{
        const res = await ChatAPI.delete(messageId, userId, token);
        dispatch(removeExistingMessage(messageId));
    } catch (e){}
};