import React, { useEffect } from 'react';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import classes from './VideoList.module.scss';
import VideoCard from './../../../VideoPageComponents/VideoCard/VideoCard';
import LoaderShell from '../../../MinorComponents/LoaderShell/LoaderShell';

const VideoList = ({videos, isFetching, error, getResults, resetResults, page, more}) => {
    useEffect(() => {
        getResults();
        return () => resetResults();
    }, []);

    if(isFetching && videos.length === 0) return <Preloader/>;
    if(error) return <span className={classes.message}>{error}</span>

    return (
        <LoaderShell getResults={getResults} isFetching={isFetching} page={page} more={more} elementId={'videolist'}>
            <div id='videolist' className={classes.listSection}>
                {videos.length === 0 
                ? <span className={classes.message}>Video list is empty</span>
                : <> {videos.map(video => {
                    return <VideoCard videodata={video} key={video._id}/>
                })}</>}
            </div>
        </LoaderShell>
    );
};

export default VideoList;