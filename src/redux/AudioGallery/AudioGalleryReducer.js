import { ADD_AUDIO, DELETE_AUDIO, GET_FAVORITE_AUDIO_FAIL, GET_FAVORITE_AUDIO_PROGRESS, GET_FAVORITE_AUDIO_SUCCESS, GET_UPLOADED_AUDIO_FAIL, GET_UPLOADED_AUDIO_PROGRESS, GET_UPLOADED_AUDIO_SUCCESS, RESET_AUDIO, SET_FAVORITE_AUDIO, UNSET_FAVORITE_AUDIO } from "./AudioGalleryTypes";

const initialState = {
    music: [],
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}

const GalleryAudioReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_UPLOADED_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_UPLOADED_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                music: action.payload.music,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_UPLOADED_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case GET_FAVORITE_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_FAVORITE_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                music: action.payload.music,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_FAVORITE_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_AUDIO:
            return {
                music: [],
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
                music: state.music.filter(a => a._id !== action.payload),
            };
        case SET_FAVORITE_AUDIO:
            return {
                ...state, 
                music: state.music.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = [...t.favorite, action.payload.userId]
                    return t;
                }),
            };
        case UNSET_FAVORITE_AUDIO:
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

export default GalleryAudioReducer;