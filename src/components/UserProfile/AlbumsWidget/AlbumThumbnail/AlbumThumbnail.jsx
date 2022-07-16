import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AlbumThumbnail.module.scss';

const AlbumThumbnail = ({albumData}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`./albums/${albumData._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.previewContainer}>
                {albumData.lastImage 
                ? <img src={albumData.lastImage.imagefile} alt='' className={classes.previewImage}/>
                : <div className={classes.previewPlaceholder}/>
                }
            </div>
            <div className={classes.infoContainer}>
                <h4 className={classes.name}>{albumData.name}</h4>
                <span className={classes.infoString}>{albumData.images.length} images</span>
            </div>
        </Link>
    );
};

export default AlbumThumbnail;