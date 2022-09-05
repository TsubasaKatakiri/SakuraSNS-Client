import { Add, Videocam } from '@material-ui/icons';
import React from 'react';
import LoaderShell from '../../MinorComponents/LoaderShell/LoaderShell';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import SimpleSearchForm from '../../MinorComponents/SimpleSearchForm/SimpleSearchForm';
import AddVideoModal from '../AddVideoModal/AddVideoModal';
import VideoCard from '../VideoCard/VideoCard';
import VideoPageHeader from '../VideoPageHeader/VideoPageHeader';
import classes from './VideoPageContent.module.scss';

const VideoPageContent = ({currentUser, opened, getResults, page, more, setOpened, addMethod, videos, isFetching, error, handleOpenModal, query, setQueryMethod}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={classes.wrapper}>
            <VideoPageHeader query={query} setQueryMethod={setQueryMethod} handleOpenModal={handleOpenModal}/>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <AddVideoModal currentUser={currentUser} opened={opened} setOpened={setOpened} addMethod={addMethod}/>
                <LoaderShell getResults={getResults} isFetching={isFetching} page={page} more={more} elementId={'videoList'}>
                    {isFetching || !videos ? <Preloader/> 
                        : <>{error 
                            ?   <div className={classes.errorScreen}>
                                    <span className={classes.errorText}>{error}</span>
                                </div>
                            :   <div id='videoList' className={classes.videoList}>
                                    {videos.map(video => {
                                        return <VideoCard key={video._id} videodata={video} isDark={isDark}/>
                                    })}
                                    {isFetching && videos ? <Preloader/> : ''}
                                </div>
                            }
                        </>
                    }
                </LoaderShell>
            </div>
        </div>
    );
};

export default VideoPageContent;