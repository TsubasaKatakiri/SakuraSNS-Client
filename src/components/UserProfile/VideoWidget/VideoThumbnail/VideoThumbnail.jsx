import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import classes from './VideoThumbnail.module.scss';

const VideoThumbnail = ({video, group}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={group ? `/groups/${group._id}/videos/${video._id}` : `/video/${video._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.videoBlock}>
                <video src={video.videofile} className={classes.video}/>
            </div>
            <div className={classes.infoBlock}>
                <h4 className={classes.name}>{video.name}</h4>
                <div className={classes.stats}>
                    <span className={classes.stat}>{video.views} views</span> 
                    <span className={classes.stat}> &bull; </span>
                    <TimeAgo datetime={video.createdAt} locale='en_US' live={true} className={classes.stat}/>
                </div>
            </div>
        </Link>
    );
};

export default VideoThumbnail;