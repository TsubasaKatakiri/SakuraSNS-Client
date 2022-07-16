import React from 'react';
import classes from './AlbumListCard.module.scss';
import noPreview from '../../../../../images/noAlbumPicture.png';
import { Link } from 'react-router-dom';

const AlbumListCard = ({albumData}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`./${albumData._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.albumPreviewBlock}>
                <img src={
                    ((albumData.albumSettings.isUserPrivate || albumData.albumSettings.isGroupPrivate) || !albumData.lastImage) 
                    ? noPreview 
                    : albumData.lastImage.imagefile
                } alt='' className={classes.albumPreview}/>
            </div>
            <div className={classes.albumInfoBlock}>
                <h4 className={classes.name}>{albumData.albumSettings.isRootAlbum ? 'Main album' : albumData.name}</h4>
                <span className={classes.images}>{albumData.images.length} images</span>
            </div>
        </Link>
    );
};

export default AlbumListCard;