import { ADD_AUDIO, DELETE_AUDIO, GET_AUDIO_FAIL, GET_AUDIO_PROGRESS, GET_AUDIO_SUCCESS, RESET_AUDIO, SET_FAVORITE, UNSET_FAVORITE } from './GroupMusicTypes';

const initialState = {
    music: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: null,
}


const GroupMusicReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                music: action.payload.music,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occured',
            };
        case RESET_AUDIO:
            return {
                music: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: null,
            };
        case ADD_AUDIO:
            return {
                ...state, 
                music: [...state.music, action.payload],
            };
        case DELETE_AUDIO:
            return {
                ...state, 
                music: state.music.filter(m => m._id !== action.payload),
            };
        case SET_FAVORITE:
            return {
                ...state, 
                music: state.music.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = [...t.favorite, action.payload.userId]
                    return t;
                }),
            };
        case UNSET_FAVORITE:
            return {
                ...state, 
                music: state.music.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = t.favorite.filter(f => f !== action.payload.userId);
                    return t;
                }),
            };
        default: 
            return state;
    }
}

export default GroupMusicReducer;