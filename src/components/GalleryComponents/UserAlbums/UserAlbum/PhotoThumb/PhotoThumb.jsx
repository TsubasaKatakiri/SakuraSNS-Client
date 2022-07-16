import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PhotoThumb.module.scss';
import noPreview from '../../../../../images/noAlbumPicture.png';

const PhotoThumb = ({photoData}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`${photoData._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <img src={photoData.imagefile ? photoData.imagefile: noPreview} alt='' className={classes.photo}/>
        </Link>
    );
};

export default PhotoThumb;