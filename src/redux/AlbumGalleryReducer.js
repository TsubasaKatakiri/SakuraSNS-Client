import { AlbumAPI } from '../api/AlbumApi';
import { ImageAPI } from '../api/ImageApi';

const GET_ALBUM_PROGRESS = 'GET_ALBUM_PROGRESS';
const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
const GET_ALBUM_FAIL = 'GET_ALBUM_FAIL';
const RESET_ALBUM = 'RESET_ALBUM';
const EDIT_ALBUM = 'EDIT_ALBUM';
const DELETE_ALBUM = 'DELETE_ALBUM';
const PRIVATE_ALBUM = 'PRIVATE_ALBUM';
const ADD_PHOTO = 'ADD_PHOTO';
const MOVE_PHOTO = 'MOVE_PHOTO"';
const DELETE_PHOTO = 'DELETE_PHOTO';


const initialState = {
    album: null,
    isFetching: false,
    error: null,
}


const UserAlbumReducer = (state = initialState, action) => {
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
        case PRIVATE_ALBUM:
            return {
                ...state, 
                album: {
                    ...state.album,
                    albumSettings: {
                        ...state.album.albumSettings,
                        isUserPrivate: action.payload,
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
export const resetUserAlbum = () => ({type: RESET_ALBUM});
const editAlbum = (data) => ({type: EDIT_ALBUM, payload: data});
const privateAlbum = (data) => ({type: PRIVATE_ALBUM, payload: data});
const deleteAlbum = () => ({type: DELETE_ALBUM});
const addPhoto = (data) => ({type: ADD_PHOTO, payload: data});
export const moveUserAlbumPhoto = (data) => ({type: MOVE_PHOTO, payload: data});
export const deleteUserAlbumPhoto = (imageId) => ({type: DELETE_PHOTO, payload: imageId});


export const getUserAlbum = (albumId, token) => async (dispatch) => {
    dispatch(startGetAlbum());
    try{
        const res = await AlbumAPI.getOne(albumId, token);
        dispatch(successGetAlbum(res.album));
    } catch (e){
        dispatch(failGetAlbum());
    }
};

export const privateUserAlbum = (albumId, userId, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.privateAlbum(albumId, userId, token);
        dispatch(privateAlbum(res.isPrivate));
    } catch (e){}
};

export const editUserAlbum = (albumId, albumData, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.update(albumId, albumData, token);
        dispatch(editAlbum(res.album));
    } catch (e){}
};

export const addUserImage = (imageData, token) => async (dispatch) => {
    try{
        const res = await ImageAPI.create(imageData, token);
        dispatch(addPhoto(res.image));
    } catch (e){}
};

export const deleteAlbumPreserve = (albumId, userId, token) => async (dispatch) => {
    try{
        await AlbumAPI.deletePreserve(albumId, userId, token);
        dispatch(deleteAlbum());
    } catch (e){}
};

export const deleteAlbumFull = (albumId, userId, token) => async (dispatch) => {
    try{
        await AlbumAPI.deleteFull(albumId, userId, token);
        dispatch(deleteAlbum());
    } catch (e){}
};


export default UserAlbumReducer;