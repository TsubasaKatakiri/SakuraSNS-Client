import React from 'react';
import classes from './VideoCard.module.scss'
import TimeAgo from 'timeago-react';
import { Link } from 'react-router-dom';
import AuthorInfo from '../../MinorComponents/AuthorInfo/AuthorInfo';

const VideoCard = ({video, group}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <Link to={group ? `/groups/${group._id}/videos/${video._id}` : `../video/${video._id}`} className={classes.videoContainer}>
                <video src={video.videofile} className={classes.video}/>
            </Link>
            <div className={classes.infoContainer}>
                <Link to={group ? `/groups/${group._id}/videos/${video._id}` : `../video/${video._id}`} className={classes.videoName}>{video.name}</Link>
                <div className={classes.videoStats}>
                    <span className={classes.videoStat}>{video.views} views</span>
                    <span className={classes.videoStat}>
                        Uploaded <TimeAgo datetime={video.createdAt} locale='en_US' live={true}/>
                    </span>
                </div>
                <AuthorInfo user={video.uploader}/>
                <div className={classes.videoDescriptionContainer}>
                    <p className={classes.videoDescription}>{video.description}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;