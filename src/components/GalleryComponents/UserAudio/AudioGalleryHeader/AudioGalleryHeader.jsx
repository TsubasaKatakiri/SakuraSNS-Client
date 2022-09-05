import React from 'react';
import classes from './AudioGalleryHeader.module.scss'; 
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Link } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';

const AudioGalleryHeader = ({userId, profile, uploadedMode, favoriteMode}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <LibraryMusicIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>{profile.username}'s Music</h3>
                </div>
                <div className={classes.controlGroup}>
                    <Link to={`./uploaded`} className={`${classes.control} ${uploadedMode ? classes.active : ''}`}>
                        <span className={classes.controlCaption}>Uploaded</span>
                    </Link>
                    <Link to={`./favorite`} className={`${classes.control} ${favoriteMode ? classes.active : ''}`}>
                        <span className={classes.controlCaption}>Favorite</span>
                    </Link>
                    <Link to={`/profile/${userId}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AudioGalleryHeader;