import { AlbumAPI } from "../../api/AlbumApi";
import { CREATE_NEW_ALBUM, GET_ALBUMS_FAIL, GET_ALBUMS_PROGRESS, GET_ALBUMS_SUCCESS, RESET_ALBUMS } from "./AlbumsGalleryTypes";

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