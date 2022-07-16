import { AlbumAPI } from "../api/AlbumApi";

const GET_GROUP_ALBUMS_PROGRESS = "GET_GROUP_ALBUMS_PROGRESS";
const GET_GROUP_ALBUMS_SUCCESS = "GET_GROUP_ALBUMS_SUCCESS";
const GET_GROUP_ALBUMS_FAIL = "GET_GROUP_ALBUMS_FAIL";
const RESET_GROUP_ALBUMS = "RESET_GROUP_ALBUMS";
const CREATE_NEW_GROUP_ALBUM = "CREATE_NEW_GROUP_ALBUM";


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
                error: "An error has occured",
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


const startGetAlbums = () => ({type: GET_GROUP_ALBUMS_PROGRESS});
const successGetAlbums = (data) => ({type: GET_GROUP_ALBUMS_SUCCESS, payload: data});
const failGetAlbums = () => ({type: GET_GROUP_ALBUMS_FAIL});
export const resetAlbums = () => ({type: RESET_GROUP_ALBUMS});
const createAlbum = (data) => ({type: CREATE_NEW_GROUP_ALBUM, payload: data});


export const getGroupAlbums = (groupId, token) => async (dispatch) => {
    dispatch(startGetAlbums());
    try{
        const res = await AlbumAPI.getAllOfGroup(groupId, token);
        dispatch(successGetAlbums(res.albums));
    } catch (e){
        dispatch(failGetAlbums());
    }
};

export const createNewGroupAlbum = (albumData, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.create(albumData, token);
        dispatch(createAlbum(res.album));
    } catch (e){
        console.log(e);
    }
};

export default GroupAlbumsReducer;