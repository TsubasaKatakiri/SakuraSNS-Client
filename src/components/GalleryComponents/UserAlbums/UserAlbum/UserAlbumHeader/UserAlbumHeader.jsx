import React from 'react';
import classes from './UserAlbumHeader.module.scss';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import { Add, ChevronLeft } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const UserAlbumHeader = ({profile, group, isAllowed, album, handleOpenModal}) => {
    const isDark = document.body.classList.contains('dark');
    const profileId = useParams().profileId;
    const groupId = useParams().groupId;

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <PhotoAlbumIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>{group ? 'Group Albums' : `${profile.username}'s Albums`}</h3>
                </div>
                <div className={classes.controlGroup}>
                    {isAllowed && !album.albumSettings.isGroupLocked
                    ?   <span className={classes.control} onClick={handleOpenModal}>
                            <Add className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Add photo...</span>
                        </span>
                    : ''}
                    <Link to={`../`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To albums list</span>
                    </Link>
                    <Link to={group ? `/groups/${groupId}` : `/profile/${profile._id}`} className={classes.control}>
                        <KeyboardDoubleArrowLeftIcon className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>{group ? 'To group' : 'To profile'}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserAlbumHeader;