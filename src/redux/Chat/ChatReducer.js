import { ADD_MESSAGE, ADD_MESSAGE_SOCKET, CREATE_NEW_CONVERSATION, GET_CONVERSATION_FAIL, GET_CONVERSATION_PROGRESS, GET_CONVERSATION_SUCCESS, GET_CURRENT_CONVERSATION_FAIL, GET_CURRENT_CONVERSATION_PROGRESS, GET_CURRENT_CONVERSATION_SUCCESS, REMOVE_MESSAGE, REMOVE_MESSAGE_SOCKET, RESET_CONVERSATIONS, RESET_CURRENT_CONVERSATION, RESET_NEW_MESSAGE, SELECT_CURRENT_CONVERSATION, SET_DELETION_MESSAGE } from './ChatTypes';

const initialState = {
    conversations: null,
    currentConversation: null,
    newMessage: null,
    messageForDeletion: null,
    currentConversationMessages: null,
    isFetching: false,
    error: '',
}

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
                error: 'An error has occurred',
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
                error: 'An error has occurred',
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

export default ChatReducer;