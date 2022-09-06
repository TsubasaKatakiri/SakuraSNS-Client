import { AlbumAPI } from "../api/AlbumApi";

const GET_ALBUMS_PROGRESS = "GET_ALBUMS_PROGRESS";
const GET_ALBUMS_SUCCESS = "GET_ALBUMS_SUCCESS";
const GET_ALBUMS_FAIL = "GET_ALBUMS_FAIL";
const RESET_ALBUMS = "RESET_ALBUMS";
const CREATE_NEW_ALBUM = "CREATE_NEW_ALBUM";


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
                error: "An error has occured",
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


const startGetAlbums = () => ({type: GET_ALBUMS_PROGRESS});
const successGetAlbums = (data) => ({type: GET_ALBUMS_SUCCESS, payload: data});
const failGetAlbums = () => ({type: GET_ALBUMS_FAIL});
export const resetUserAlbums = () => ({type: RESET_ALBUMS});
const createAlbum = (data) => ({type: CREATE_NEW_ALBUM, payload: data});


export const getUserAlbums = (userId, token) => async (dispatch) => {
    dispatch(startGetAlbums());
    try{
        const res = await AlbumAPI.getAll(userId, token);
        dispatch(successGetAlbums(res.albums));
    } catch (e){
        dispatch(failGetAlbums());
    }
};

export const createNewUserAlbum = (albumData, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.create(albumData, token);
        dispatch(createAlbum(res.album));
    } catch (e){
        console.log(e);
    }
};


export default UserAlbumsReducer;