import { AlbumAPI } from '../../api/AlbumApi';
import { ADD_PHOTO, DELETE_ALBUM, DELETE_PHOTO, EDIT_ALBUM, GET_ALBUM_FAIL, GET_ALBUM_PROGRESS, GET_ALBUM_SUCCESS, LOCK_ALBUM, MOVE_PHOTO, PRIVATE_ALBUM, RESET_ALBUM } from './GroupAlbumsTypes';
import { ImageAPI } from './../../api/ImageApi';

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