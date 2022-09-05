import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addUserImage, deleteAlbumFull, deleteAlbumPreserve, editUserAlbum, getUserAlbum, privateUserAlbum, resetUserAlbum } from '../../../../redux/AlbumGallery/AlbumGalleryActions';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import UserAlbum from './UserAlbum';
import classes from './UserAlbum.module.scss';

const UserAlbumContainer = ({currentUser, token, profile, album, getUserAlbum, resetAlbum, addImage, editAlbum, deleteAlbumPreserve, deleteAlbumFull, ...props}) => {
    const albumId = useParams().albumId;
    const imageId = useParams().imageId;
    const [modalAddOpened, setModalAddOpened] = useState(false);
    const [modalUpdateOpened, setModalUpdateOpened] = useState(false);
    const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
    const [modalImageOpened, setModalImageOpened] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(imageId) {
            setModalImageOpened(true);
        } else {
            setModalImageOpened(false);
        }
    }, [imageId]);

    useEffect(()=>{
        getUserAlbum(albumId, token);
        return () => resetAlbum();
    }, [albumId]);

    const handleOpenAddModal = () => setModalAddOpened(!modalAddOpened);
    const handleOpenUpdateModal = () => setModalUpdateOpened(!modalUpdateOpened);
    const handleOpenDeleteModal = () => setModalDeleteOpened(!modalDeleteOpened);

    if(modalAddOpened || modalUpdateOpened || modalDeleteOpened || modalImageOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const addMethod = (newImage) => {
        addImage(newImage, token);
    }

    const updateMethod = (albumData) => {
        editAlbum(albumId, albumData, token);
    }

    const deletePreserveMethod = () => {
        deleteAlbumPreserve(albumId, currentUser._id, token);
        navigate(`../`);
    }

    const deleteFullMethod = () => {
        deleteAlbumFull(albumId, currentUser._id, token);
        navigate(`../`);
    }

    return (!album || props.isFetching) ? <Preloader/> : <UserAlbum currentUser={currentUser} token={token} profile={profile} album={album} handleOpenAddModal={handleOpenAddModal} handleOpenDeleteModal={handleOpenDeleteModal} handleOpenUpdateModal={handleOpenUpdateModal} privateAlbum={props.privateAlbum} updateOpened={modalUpdateOpened} setUpdateOpened={setModalUpdateOpened} updateMethod={updateMethod} addOpened={modalAddOpened} setAddOpened={setModalAddOpened} addMethod={addMethod} deleteOpened={modalDeleteOpened} setDeleteOpened={setModalDeleteOpened} deletePreserveMethod={deletePreserveMethod} deleteFullMethod={deleteFullMethod} imageOpened={modalImageOpened} setImageOpened={setModalImageOpened}/>
};


const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        album: state.galleryAlbum.album,
        isFetching: state.galleryAlbum.isFetching,
        error: state.galleryAlbum.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserAlbum: (albumId, token) => {dispatch(getUserAlbum(albumId, token))},
        resetAlbum: () => {dispatch(resetUserAlbum())},
        privateAlbum: (albumId, userId, token) => {dispatch(privateUserAlbum(albumId, userId, token))},
        editAlbum: (albumId, albumData, token) => {dispatch(editUserAlbum(albumId, albumData, token))},
        addImage: (imageData, token) => {dispatch(addUserImage(imageData, token))},
        deleteAlbumPreserve: (albumId, userId, token) => {dispatch(deleteAlbumPreserve(albumId, userId, token))},
        deleteAlbumFull: (albumId, userId, token) => {dispatch(deleteAlbumFull(albumId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAlbumContainer);