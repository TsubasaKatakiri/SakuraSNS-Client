import React from 'react';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import VideoCard from '../../../VideoSearchComponents/VideoCard/VideoCard';
import classes from './VideoList.module.scss';

const VideoList = ({results, isFetching, group}) => {
    return (
        <div id='videolist' className={classes.wrapper}>
            {results.map(video => {
                return <VideoCard key={video._id} video={video} group={group}/>
            })}
            {isFetching && results ? <Preloader/> : ''}
        </div>
    );
};

export default VideoList;