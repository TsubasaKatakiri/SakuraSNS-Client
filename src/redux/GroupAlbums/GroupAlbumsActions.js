import { AlbumAPI } from '../../api/AlbumApi';
import { CREATE_NEW_GROUP_ALBUM, GET_GROUP_ALBUMS_FAIL, GET_GROUP_ALBUMS_PROGRESS, GET_GROUP_ALBUMS_SUCCESS, RESET_GROUP_ALBUMS } from './GroupAlbumsTypes';

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