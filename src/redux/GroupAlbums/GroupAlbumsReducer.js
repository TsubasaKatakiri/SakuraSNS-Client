import { CREATE_NEW_GROUP_ALBUM, GET_GROUP_ALBUMS_FAIL, GET_GROUP_ALBUMS_PROGRESS, GET_GROUP_ALBUMS_SUCCESS, RESET_GROUP_ALBUMS } from './GroupAlbumsTypes';

const initialState = {
    albums: [],
    isFetching: false,
    error: null,
}


const GroupAlbumsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GROUP_ALBUMS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_GROUP_ALBUMS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                albums: action.payload,
            };
        case GET_GROUP_ALBUMS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_GROUP_ALBUMS:
            return {
                ...state, 
                albums: null,
                isFetching: true,
                error: null,
            };
        case CREATE_NEW_GROUP_ALBUM:
            return {
                ...state, 
                albums: [...state.albums, action.payload],
            };
        default: 
            return state;
    }
}

export default GroupAlbumsReducer;