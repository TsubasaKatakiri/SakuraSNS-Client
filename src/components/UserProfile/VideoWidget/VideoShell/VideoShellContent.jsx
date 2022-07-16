import React from 'react';
import VideoThumbnail from '../VideoThumbnail/VideoThumbnail';
import classes from './VideoShell.module.scss';

const VideoShellContent = ({videos, group}) => {
    const videoList = videos.length > 2 ? videos.slice(0, 2) : videos;

    return (
        <>
            {videoList.length > 0
                ? <>
                    {videoList.map(video => {
                        return <VideoThumbnail key={video._id} video={video} group={group}/> 
                    })}
                </>
                : <span className={classes.message}>No videos is currently here.</span>
            }
        </>
    );
};

export default VideoShellContent;