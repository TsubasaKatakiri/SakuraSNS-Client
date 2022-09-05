import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../../images/noAvatar.png';
import classes from './VideoCard.module.scss';
import TimeAgo from 'timeago-react';

const VideoCard = ({videodata}) => {
    const isDark = document.body.classList.contains('dark');
    const navigate = useNavigate();

    const handleChoice = (e) => {
        if(!e.target.closest('a')) navigate(`/video/${videodata._id}`);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`} onClick={handleChoice}>
            <div className={classes.previewContainer}>
                <video src={videodata.videofile} className={classes.preview}/>
            </div>
            <div className={classes.infoBlock}>
                <Link to={`/profile/${videodata.uploader._id}`} className={classes.author}>
                    <img className={classes.avatar} src={videodata.uploader.profilePicture ? videodata.uploader.profilePicture : avatar} alt=''/>
                </Link>
                <div className={classes.info}>
                    <span className={classes.name}>{videodata.name}</span>
                    <Link to={`/profile/${videodata.uploader._id}`} className={classes.uploader}>{videodata.uploader.username}</Link>
                    <div className={classes.statString}>
                        <span className={classes.stat}>{videodata.views}&nbsp;views</span>
                        <span className={classes.stat}>&bull;</span>
                        <TimeAgo className={classes.stat} datetime={videodata.createdAt} locale='en_US' live={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;