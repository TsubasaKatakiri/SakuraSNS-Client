import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createNewUserAlbum, getUserAlbums, resetUserAlbums } from '../../../../redux/AlbumsGallery/AlbumsGalleryActions';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import UserAlbumsList from './UserAlbumsList';
import classes from './UserAlbumsList.module.scss';

const UserAlbumsListContainer = ({currentUser, token, profile, albums, isFetching, error, getAlbums, resetAlbums, createAlbum}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const profileId = useParams().userId;

    const handleOpenModal = () => setModalOpened(!modalOpened);

    if(modalOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);
    
    useEffect(() => {
        getAlbums(profileId, token);
        return () => resetAlbums();
    }, [profileId]);

    const createMethod = (newAlbum) => {
        createAlbum(newAlbum, token);
    }

    return (!albums || isFetching) ? <Preloader/> : <UserAlbumsList currentUser={currentUser} profile={profile} albums={albums} modalOpened={modalOpened} setModalOpened={setModalOpened} handleOpenModal={handleOpenModal} createMethod={createMethod}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        albums: state.galleryAlbums.albums,
        isFetching: state.galleryAlbums.isFetching,
        error: state.galleryAlbums.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbums: (userId, token) => {dispatch(getUserAlbums(userId, token))},
        resetAlbums: () => {dispatch(resetUserAlbums())},
        createAlbum: (albumData, token) => {dispatch(createNewUserAlbum(albumData, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAlbumsListContainer);