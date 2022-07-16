import React, { useState } from 'react';
import classes from './GroupAlbum.module.scss';
import { checkPolicy } from '../../../../util/CheckPolicy';
import UserAlbumHeader from '../../../GalleryComponents/UserAlbums/UserAlbum/UserAlbumHeader/UserAlbumHeader';
import AlbumCreateModal from '../../../GalleryComponents/UserAlbums/UserAlbumsList/AlbumCreateModal/AlbumCreateModal';
import ImageAddModal from '../../../GalleryComponents/UserAlbums/UserAlbum/ImageAddModal/ImageAddModal';
import PhotoThumb from '../../../GalleryComponents/UserAlbums/UserAlbum/PhotoThumb/PhotoThumb';
import AlbumDeletionModal from '../../../GalleryComponents/UserAlbums/UserAlbum/AlbumDeletionModal/AlbumDeletionModal';
import ImageModal from '../../../GalleryComponents/UserAlbums/ImageModal/ImageModal';
import UserAlbumControls from '../../../GalleryComponents/UserAlbums/UserAlbum/UserAlbumControls/UserAlbumControls';

const GroupAlbum = ({currentUser, token, group, album, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canUploadFiles);
    const [isPrivate, setIsPrivate] = useState(album.albumSettings.isGroupPrivate);
    const [isLocked, setIsLocked] = useState(album.albumSettings.isGroupLocked);

    const handlePrivate = () => {
        props.privateAlbum(album._id, currentUser._id, token);
        setIsPrivate(!isPrivate);
    }

    const handleLock = () => {
        props.lockAlbum(album._id, currentUser._id, token);
        setIsLocked(!isLocked);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <UserAlbumHeader group={group} isAllowed={isAllowed} album={album} handleOpenModal={props.handleOpenAddModal}/>
            <div className={classes.pageMain}>
                <UserAlbumControls album={album} isAllowed={isAllowed} isLocked={isLocked} isPrivate={isPrivate} handleLock={handleLock} handlePrivate={handlePrivate} openDeleteModal={props.handleOpenDeleteModal} openUpdateModal={props.handleOpenUpdateModal}/>
                <div className={classes.listSection}>
                    {album.images.length > 0
                    ? <>{album.images.map(image=>{
                        return <PhotoThumb key={image._id} photoData={image}/>
                    })}</>
                    : <span className={classes.message}>This album is empty.</span>}
                </div>
                <AlbumCreateModal currentUser={currentUser} group={group} album={album} opened={props.updateOpened} setOpened={props.setUpdateOpened} updateMethod={props.updateMethod}/>
                <ImageAddModal currentUser={currentUser} group={group} album={album} opened={props.addOpened} setOpened={props.setAddOpened} addMethod={props.addMethod}/>
                <AlbumDeletionModal album={album} opened={props.deleteOpened} setOpened={props.setDeleteOpened} deletePreserveMethod={props.deletePreserveMethod} deleteFullMethod={props.deleteFullMethod}/>
                <ImageModal opened={props.imageOpened} setOpened={props.setImageOpened}/>
            </div>
        </div>
    );
};

export default GroupAlbum;