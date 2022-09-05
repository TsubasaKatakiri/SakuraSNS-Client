import React from 'react';
import VideoThumbnail from '../../UserProfile/VideoWidget/VideoThumbnail/VideoThumbnail';
import classes from './VideoRibbon.module.scss';

const VideoRibbon = ({videos, currentVideo, group}) => {
   const videoList = videos.filter(v => v._id !== currentVideo._id).slice(0, 20);

    return (
        <div className={classes.wrapper}>
            {videoList.map(video => {
                return <VideoThumbnail key={video._id} video={video} group={group}/> 
            })}
        </div>
    );
};

export default VideoRibbon;