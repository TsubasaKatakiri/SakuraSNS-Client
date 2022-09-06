import { ChatAPI } from '../api/ChatApi';
import { ConversationAPI } from './../api/ConversationApi';

const GET_CONVERSATION_PROGRESS = "GET_CONVERSATION_PROGRESS";
const GET_CONVERSATION_SUCCESS = "GET_CONVERSATION_SUCCESS";
const GET_CONVERSATION_FAIL = "GET_CONVERSATION_FAIL";
const CREATE_NEW_CONVERSATION = "CREATE_NEW_CONVERSATION";
const SELECT_CURRENT_CONVERSATION = "SELECT_CURRENT_CONVERSATION";
const GET_CURRENT_CONVERSATION_PROGRESS = "GET_CURRENT_CONVERSATION_PROGRESS";
const GET_CURRENT_CONVERSATION_SUCCESS = "GET_CURRENT_CONVERSATION_SUCCESS";
const GET_CURRENT_CONVERSATION_FAIL = "GET_CURRENT_CONVERSATION_FAIL";
const ADD_MESSAGE = "ADD_MESSAGE";
const ADD_MESSAGE_SOCKET = "ADD_MESSAGE_SOCKET";
const REMOVE_MESSAGE = "REMOVE_MESSAGE";
const REMOVE_MESSAGE_SOCKET = "REMOVE_MESSAGE_SOCKET";
const RESET_CURRENT_CONVERSATION = "RESET_CURRENT_CONVERSATION";
const RESET_CONVERSATIONS = "RESET_CONVERSATIONS";
const SET_DELETION_MESSAGE = "SET_DELETION_MESSAGE";
const RESET_NEW_MESSAGE = "RESET_NEW_MESSAGE";

//chat initial state
const initialState = {
    conversations: null,
    currentConversation: null,
    newMessage: null,
    messageForDeletion: null,
    currentConversationMessages: null,
    isFetching: false,
    error: "",
}

//chat reducer
const ChatReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CONVERSATION_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_CONVERSATION_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                conversations: action.payload,
            };
        case GET_CONVERSATION_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case CREATE_NEW_CONVERSATION:
            return {
                ...state, 
                conversations: action.payload.isCreated ? [...state.conversations, action.payload.conversation] : state.conversations,
                currentConversation: action.payload.conversation,
            };
        case SELECT_CURRENT_CONVERSATION:
            return {
                ...state, 
                currentConversation: action.payload,
            };
        case GET_CURRENT_CONVERSATION_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_CURRENT_CONVERSATION_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                currentConversationMessages: action.payload,
            };
        case GET_CURRENT_CONVERSATION_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case ADD_MESSAGE:
            return {
                ...state, 
                currentConversationMessages: [...state.currentConversationMessages, action.payload],
                newMessage: action.payload,
            };
        case ADD_MESSAGE_SOCKET:
            return {
                ...state, 
                currentConversationMessages: [...state.currentConversationMessages, action.payload],
            };
        case REMOVE_MESSAGE:
            return {
                ...state, 
                currentConversationMessages: state.currentConversationMessages.filter(m => m._id !== action.payload),
                messageForDeletion: action.payload,
            };
        case REMOVE_MESSAGE_SOCKET:
            return {
                ...state, 
                currentConversationMessages: state.currentConversationMessages.filter(m => m._id !== action.payload),
            };
        case RESET_CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: null,
                currentConversationMessages: null,
                newMessage: null,
                messageForDeletion: null,
            }
        case RESET_CONVERSATIONS:
            return {
                ...state,
                conversations: null,
                currentConversation: null,
            }
        case SET_DELETION_MESSAGE:
            return {
                ...state,
                messageForDeletion: action.payload,
            }
        case RESET_NEW_MESSAGE:
            return {
                ...state,
                newMessage: null,
            }
        default: 
            return state;
    }
}

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

//chat thunks
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

export default ChatReducer;