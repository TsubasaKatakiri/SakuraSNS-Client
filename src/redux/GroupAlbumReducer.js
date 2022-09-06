import { AlbumAPI } from "../api/AlbumApi";
import { ImageAPI } from './../api/ImageApi';

const GET_ALBUM_PROGRESS = "GET_ALBUM_PROGRESS";
const GET_ALBUM_SUCCESS = "GET_ALBUM_SUCCESS";
const GET_ALBUM_FAIL = "GET_ALBUM_FAIL";
const RESET_ALBUM = "RESET_ALBUM";
const EDIT_ALBUM = "EDIT_ALBUM";
const DELETE_ALBUM = "DELETE_ALBUM";
const PRIVATE_ALBUM = "PRIVATE_ALBUM";
const LOCK_ALBUM = "LOCK_ALBUM";
const ADD_PHOTO = "ADD_PHOTO";
const MOVE_PHOTO = "MOVE_PHOTO";
const DELETE_PHOTO = "DELETE_PHOTO";


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
                error: "An error has occured",
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


const startGetAlbum = () => ({type: GET_ALBUM_PROGRESS});
const successGetAlbum = (data) => ({type: GET_ALBUM_SUCCESS, payload: data});
const failGetAlbum = () => ({type: GET_ALBUM_FAIL});
export const resetAlbum = () => ({type: RESET_ALBUM});
const editAlbum = (data) => ({type: EDIT_ALBUM, payload: data});
const lockAlbum = (data) => ({type: LOCK_ALBUM, payload: data});
const privateAlbum = (data) => ({type: PRIVATE_ALBUM, payload: data});
const deleteAlbum = () => ({type: DELETE_ALBUM});
const addPhoto = (data) => ({type: ADD_PHOTO, payload: data});
export const moveGroupAlbumPhoto = (data) => ({type: MOVE_PHOTO, payload: data});
export const deleteGroupAlbumPhoto = (imageId) => ({type: DELETE_PHOTO, payload: imageId});


export const getGroupAlbum = (albumId, groupData, token) => async (dispatch) => {
    dispatch(startGetAlbum());
    try{
        const res = await AlbumAPI.getOneOfGroup(albumId, groupData, token);
        dispatch(successGetAlbum(res.album));
    } catch (e){
        dispatch(failGetAlbum());
    }
};

export const lockGroupAlbum = (albumId, userId, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.lockAlbum(albumId, userId, token);
        dispatch(lockAlbum(res.isLocked));
    } catch (e){}
};

export const privateGroupAlbum = (albumId, userId, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.privateAlbum(albumId, userId, token);
        dispatch(privateAlbum(res.isPrivate));
    } catch (e){}
};

export const editGroupAlbum = (albumId, albumData, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.update(albumId, albumData, token);
        dispatch(editAlbum(res.album));
    } catch (e){}
};

export const addGroupImage = (imageData, token) => async (dispatch) => {
    try{
        const res = await ImageAPI.create(imageData, token);
        dispatch(addPhoto(res.image));
    } catch (e){}
};

export const deleteGroupAlbumPreserve = (albumId, userId, token) => async (dispatch) => {
    try{
        await AlbumAPI.deletePreserve(albumId, userId, token);
        dispatch(deleteAlbum());
    } catch (e){}
};

export const deleteGroupAlbumFull = (albumId, userId, token) => async (dispatch) => {
    try{
        await AlbumAPI.deleteFull(albumId, userId, token);
        dispatch(deleteAlbum());
    } catch (e){}
};

export default GroupAlbumReducer;