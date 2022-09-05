import { ADD_PHOTO, DELETE_ALBUM, DELETE_PHOTO, EDIT_ALBUM, GET_ALBUM_FAIL, GET_ALBUM_PROGRESS, GET_ALBUM_SUCCESS, LOCK_ALBUM, MOVE_PHOTO, PRIVATE_ALBUM, RESET_ALBUM } from './GroupAlbumsTypes';

const initialState = {
    album: null,
    isFetching: false,
    error: null,
}


const GroupAlbumReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALBUM_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_ALBUM_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                album: action.payload,
            };
        case GET_ALBUM_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_ALBUM:
            return {
                ...state, 
                album: null,
                isFetching: true,
                error: null,
            };
        case EDIT_ALBUM:
            return {
                ...state, 
                album: action.payload,
            };
        case DELETE_ALBUM:
            return {
                ...state, 
                album: null,
            };
        case LOCK_ALBUM:
            return {
                ...state, 
                album: {
                    ...state.album,
                    albumSettings: {
                        ...state.album.albumSettings,
                        isGroupLocked: action.payload,
                    } 
                },
            };
        case PRIVATE_ALBUM:
            return {
                ...state, 
                album: {
                    ...state.album,
                    albumSettings: {
                        ...state.album.albumSettings,
                        isGroupPrivate: action.payload,
                    } 
                },
            };
        case ADD_PHOTO:
        case MOVE_PHOTO:
            return {
                ...state, 
                album: {
                    ...state.album, 
                    images: [...state.album.images, action.payload]},
            };
        case DELETE_PHOTO:
            return {
                ...state, 
                album: {
                    ...state.album, 
                    images: state.album.images.filter(i => i._id !==action.payload)}
            }
        default: 
            return state;
    }
}

export default GroupAlbumReducer;