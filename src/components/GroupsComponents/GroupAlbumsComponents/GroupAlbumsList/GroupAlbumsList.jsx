import React from 'react';
import classes from './GroupAlbumsList.module.scss';
import { checkPolicy } from './../../../../util/CheckPolicy';
import UserAlbumsHeader from '../../../GalleryComponents/UserAlbums/UserAlbumsList/UserAlbumsHeader/UserAlbumsHeader';
import AlbumCreateModal from '../../../GalleryComponents/UserAlbums/UserAlbumsList/AlbumCreateModal/AlbumCreateModal';
import AlbumListCard from '../../../GalleryComponents/UserAlbums/UserAlbumsList/AlbumListCard/AlbumListCard';
import { useParams } from 'react-router-dom';

const GroupAlbumsList = ({currentUser, group, albums, modalOpened, setModalOpened, handleOpenModal, createMethod}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canCreateAlbums);
    const groupId = useParams().groupId;
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <UserAlbumsHeader isAllowed={isAllowed} group={group} handleOpenModal={handleOpenModal}/>
            <div className={classes.pageMain}>
                <div className={classes.listSection}>
                    {albums.length === 0 
                        ? <span className={classes.message}>Album list is empty</span>
                        : <> {albums.map(album => {
                            return <AlbumListCard key={album._id} albumData={album}/>
                        })}</>
                    }
                </div>
            </div>
            <AlbumCreateModal currentUser={currentUser} group={group} opened={modalOpened} setOpened={setModalOpened} createMethod={createMethod}/>
        </div>
    );
};

export default GroupAlbumsList;