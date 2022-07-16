import { CREATE_NEW_ALBUM, GET_ALBUMS_FAIL, GET_ALBUMS_PROGRESS, GET_ALBUMS_SUCCESS, RESET_ALBUMS } from './AlbumsGalleryTypes';

const initialState = {
    albums: [],
    isFetching: false,
    error: null,
}

const UserAlbumsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALBUMS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_ALBUMS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                albums: action.payload,
            };
        case GET_ALBUMS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_ALBUMS:
            return {
                ...state, 
                albums: null,
                isFetching: false,
                error: null,
            };
        case CREATE_NEW_ALBUM:
            return {
                ...state, 
                albums: [...state.albums, action.payload],
            };
        default: 
            return state;
    }
}

export default UserAlbumsReducer;