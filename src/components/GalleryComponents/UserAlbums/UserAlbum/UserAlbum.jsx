import React, { useState } from 'react';
import classes from './UserAlbum.module.scss';
import UserAlbumHeader from './UserAlbumHeader/UserAlbumHeader';
import UserAlbumControls from './UserAlbumControls/UserAlbumControls';
import PhotoThumb from './PhotoThumb/PhotoThumb';
import AlbumCreateModal from './../UserAlbumsList/AlbumCreateModal/AlbumCreateModal';
import AlbumDeletionModal from './AlbumDeletionModal/AlbumDeletionModal';
import ImageAddModal from './ImageAddModal/ImageAddModal';
import ImageModal from './../ImageModal/ImageModal';


const UserAlbum = ({currentUser, token, profile, album, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const [isPrivate, setIsPrivate] = useState(album.albumSettings.isUserPrivate);
    const isAllowed = currentUser._id === profile._id;

    const handlePrivate = () => {
        props.privateAlbum(album._id, currentUser._id, token);
        setIsPrivate(!isPrivate);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <UserAlbumHeader profile={profile} isAllowed={isAllowed} album={album} handleOpenModal={props.handleOpenAddModal}/>
            <div className={classes.pageMain}>
                {isPrivate && !isAllowed
                ? <div className={classes.message}>Access forbidden: {profile.username} has restricted access to this album.</div>
                : <>
                    <UserAlbumControls isAllowed={isAllowed} album={album} isPrivate={isPrivate} handlePrivate={handlePrivate} openDeleteModal={props.handleOpenDeleteModal} openUpdateModal={props.handleOpenUpdateModal}/>
                    <div className={classes.listSection}>
                        {album.images.length > 0
                        ? <>{album.images.map(image=>{
                            return <PhotoThumb key={image._id} photoData={image}/>
                        })}</>
                        : <span className={classes.message}>This album is empty.</span>}
                    </div>
                    <AlbumCreateModal currentUser={currentUser} album={album} opened={props.updateOpened} setOpened={props.setUpdateOpened} updateMethod={props.updateMethod}/>
                    <ImageAddModal currentUser={currentUser} album={album} opened={props.addOpened} setOpened={props.setAddOpened} addMethod={props.addMethod}/>
                    <AlbumDeletionModal album={album} opened={props.deleteOpened} setOpened={props.setDeleteOpened} deletePreserveMethod={props.deletePreserveMethod} deleteFullMethod={props.deleteFullMethod}/>
                    <ImageModal opened={props.imageOpened} setOpened={props.setImageOpened}/>
                </> 
                }
            </div>
        </div>
    );
};

export default UserAlbum;