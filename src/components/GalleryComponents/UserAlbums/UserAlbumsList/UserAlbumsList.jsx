import React from 'react';
import classes from './UserAlbumsList.module.scss';
import { useParams } from 'react-router-dom';
import UserAlbumsHeader from './UserAlbumsHeader/UserAlbumsHeader';
import AlbumCreateModal from './AlbumCreateModal/AlbumCreateModal';
import AlbumListCard from './AlbumListCard/AlbumListCard';

const UserAlbumsList = ({currentUser, profile, albums, modalOpened, setModalOpened, createMethod, handleOpenModal}) => {
    const isDark = document.body.classList.contains('dark');
    const profileId = useParams().userId;
    const isAllowed = currentUser._id === profileId;

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <UserAlbumsHeader isAllowed={isAllowed} profile={profile} handleOpenModal={handleOpenModal}/>
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
            <AlbumCreateModal currentUser={currentUser} opened={modalOpened} setOpened={setModalOpened} createMethod={createMethod}/>
        </div>
    );
};

export default UserAlbumsList;