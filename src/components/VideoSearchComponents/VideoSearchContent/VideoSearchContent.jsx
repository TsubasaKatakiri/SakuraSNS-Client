import React from 'react';
import LoaderShell from '../../MinorComponents/LoaderShell/LoaderShell';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import VideoCard from '../VideoCard/VideoCard';
import VideoSearchHeader from '../VideoSearchHeader/VideoSearchHeader';
import classes from './VideoSearchContent.module.scss';

const VideoSearchContent = ({getResults, query, setQueryMethod, videos, isFetching, error, page, more}) => {
    return (
        <LoaderShell getResults={getResults} isFetching={isFetching} page={page} more={more} elementId={'videoList'}>
            <div className={classes.wrapper}>
                <VideoSearchHeader query={query} setQueryMethod={setQueryMethod}/>
                <div className={classes.body}>
                    {isFetching || !videos ? <Preloader/> 
                    : <>{error 
                        ?   <div className={classes.errorScreen}>
                                <span className={classes.errorText}>{error}</span>
                            </div>
                        :   <div id='videoList' className={classes.videoList}>
                                {videos.map(video => {
                                    return <VideoCard key={video._id} video={video}/>
                                })}
                                {isFetching && videos ? <Preloader/> : ''}
                            </div>
                        }</>
                    }
                </div>
            </div>
        </LoaderShell>
    );
};

export default VideoSearchContent;