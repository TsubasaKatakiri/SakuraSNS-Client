import { AlbumAPI } from "../api/AlbumApi";
import { ImageAPI } from "../api/ImageApi";

const GET_USER_ALBUMS_PROGRESS = "GET_USER_ALBUMS_PROGRESS";
const GET_USER_ALBUMS_SUCCESS = "GET_USER_ALBUMS_SUCCESS";
const GET_USER_ALBUMS_FAIL = "GET_USER_ALBUMS_FAIL";
const GET_CURRENT_ALBUM_PROGRESS = "GET_CURRENT_ALBUM_PROGRESS";
const GET_CURRENT_ALBUM_SUCCESS = "GET_CURRENT_ALBUM_SUCCESS";
const GET_CURRENT_ALBUM_FAIL = "GET_CURRENT_ALBUM_FAIL";
const CREATE_NEW_USER_ALBUM = "CREATE_NEW_USER_ALBUM";
const EDIT_USER_ALBUM = "EDIT_USER_ALBUM";
const DELETE_ALBUM_PRESERVE = "DELETE_ALBUM_PRESERVE";
const DELETE_ALBUM_FULL = "DELETE_ALBUM_FULL";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const GET_IMAGE_PROGRESS = "GET_IMAGE_PROGRESS";
const GET_IMAGE_SUCCESS = "GET_IMAGE_SUCCESS";
const GET_IMAGE_FAIL = "GET_IMAGE_FAIL";
const UPDATE_IMAGE = "UPDATE_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";

//gallery initial state
const initialState = {
    userAlbums: null,
    currentAlbum: null,
    currentImage: null,
    previousImage: null,
    nextImage: null,
    errorUserAlbums: "",
    errorCurrentAlbum: "",
    errorCurrentImage: "",
    isFetching: false,
}


const ImageGalleryReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USER_ALBUMS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_USER_ALBUMS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                userAlbums: action.payload,
            };
        case GET_USER_ALBUMS_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorUserAlbums: "An error has occured",
            };
        case CREATE_NEW_USER_ALBUM:
            return {
                ...state, 
                isFetching: false,
                userAlbums: [...state.userAlbums, action.payload],
            };
        case GET_CURRENT_ALBUM_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_CURRENT_ALBUM_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                currentAlbum: action.payload,
            };
        case GET_CURRENT_ALBUM_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorCurrentAlbum: "An error has occured",
            };
        case EDIT_USER_ALBUM:
            console.log(action.payload);
            return {
                ...state, 
                isFetching: false,
                currentAlbum: action.payload,
                userAlbums: state.userAlbums.map(a=>{
                    if(a._id === action.payload._id) a = action.payload;
                    return a;
                })
            };
        case DELETE_ALBUM_PRESERVE:
        case DELETE_ALBUM_FULL:
            return {
                ...state, 
                currentAlbum: null,
                userAlbums: state.userAlbums.filter(a=>a._id !== action.payload)
            };
        case UPLOAD_IMAGE:
            return {
                ...state, 
                currentAlbum: {
                    ...state.currentAlbum,
                    images: [...state.currentAlbum.images, action.payload]
                }
            };
        case GET_IMAGE_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_IMAGE_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                currentImage: action.payload,
            };
        case GET_IMAGE_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorCurrentImage: "An error has occured",
            };
        case UPDATE_IMAGE:
            return {
                ...state, 
                currentImage: action.payload,
            };
        case DELETE_IMAGE:
            return {
                ...state, 
                currentImage: null,
                currentAlbum: {
                    ...state.currentAlbum,
                    images: state.currentAlbum.images.filter(i => i._id !== action.payload),
                },
            };
        default: 
            return state;
    }
}


//albums action creators
const startGetAlbums = () => ({type: GET_USER_ALBUMS_PROGRESS});
const successGetAlbums = (data) => ({type: GET_USER_ALBUMS_SUCCESS, payload: data});
const failGetAlbums = () => ({type: GET_USER_ALBUMS_FAIL});
const createNewAlbum = (data) => ({type: CREATE_NEW_USER_ALBUM, payload: data});
const startGetCurrentAlbum = () => ({type: GET_CURRENT_ALBUM_PROGRESS});
const successGetCurrentAlbum = (data) => ({type: GET_CURRENT_ALBUM_SUCCESS, payload: data});
const failGetCurrentAlbum = () => ({type: GET_CURRENT_ALBUM_FAIL});
const editUserAlbum = (data) => ({type: EDIT_USER_ALBUM, payload: data});
const deletePreserveUserAlbum = (data) => ({type: DELETE_ALBUM_PRESERVE, payload: data});
const deleteFullUserAlbum = (data) => ({type: DELETE_ALBUM_FULL, payload: data});
const uploadImageToAlbum = (data) => ({type: UPLOAD_IMAGE, payload: data});
const getImageProgress = () => ({type: GET_IMAGE_PROGRESS});
const getImageSuccess = (data) => ({type: GET_IMAGE_SUCCESS, payload: data});
const getImageFail = () => ({type: GET_IMAGE_FAIL});
const updateUserImage = (data) => ({type: UPDATE_IMAGE, payload: data});
const deleteUserImage = (data) => ({type: DELETE_IMAGE, payload: data});


//album thunks
export const getUserAlbums = (userId, token) => async (dispatch) => {
    dispatch(startGetAlbums());
    try{
        const res = await AlbumAPI.getAll(userId, token);
        dispatch(successGetAlbums(res.albums));
    } catch (e){
        dispatch(failGetAlbums());
    }
};

export const getUserCurrentAlbum = (albumId, token) => async (dispatch) => {
    dispatch(startGetCurrentAlbum());
    try{
        const res = await AlbumAPI.getOne(albumId, token);
        dispatch(successGetCurrentAlbum(res.album));
    } catch (e){
        dispatch(failGetCurrentAlbum());
    }
};

export const createNewUserAlbum = (albumData, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.create(albumData, token);
        dispatch(createNewAlbum(res.album));
    } catch (e){
        console.log(e);
    }
};

export const editAlbum = (albumId, albumData, token) => async (dispatch) => {
    try{
        const res = await AlbumAPI.update(albumId, albumData, token);
        dispatch(editUserAlbum(res.album));
    } catch (e){
        console.log(e);
    }
};

export const deleteAlbumPreserve = (albumId, userId, token) => async (dispatch) => {
    try{
        await AlbumAPI.deletePreserve(albumId, userId, token);
        dispatch(deletePreserveUserAlbum(albumId));
    } catch (e){
        console.log(e);
    }
};

export const deleteAlbumFull = (albumId, userId, token) => async (dispatch) => {
    try{
        await AlbumAPI.deleteFull(albumId, userId, token);
        dispatch(deleteFullUserAlbum(albumId));
    } catch (e){
        console.log(e);
    }
};

export const uploadImage = (imageData, token) => async (dispatch) => {
    try{
        const res = await ImageAPI.create(imageData, token);
        dispatch(uploadImageToAlbum(res.image));
    } catch (e){
        console.log(e);
    }
};

export const getImage = (imageId, token) => async (dispatch) => {
    dispatch(getImageProgress());
    try{
        const res = await ImageAPI.getOne(imageId, token);
        dispatch(getImageSuccess(res.image));
    } catch (e){
        dispatch(getImageFail());
    }
};

export const updateImage = (imageId, imageData, token) => async (dispatch) => {
    try{
        const res = await ImageAPI.update(imageId, imageData, token);
        dispatch(updateUserImage(res.image));
    } catch (e){
        console.log(e);
    }
};

export const deleteImage = (imageId, userId, token) => async (dispatch) => {
    try{
        await ImageAPI.delete(imageId, userId, token);
        dispatch(deleteUserImage(imageId));
    } catch (e){
        console.log(e);
    }
};

export default ImageGalleryReducer;