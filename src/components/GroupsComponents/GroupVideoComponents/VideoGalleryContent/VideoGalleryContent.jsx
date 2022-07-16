import React from 'react';
import LoaderShell from '../../../MinorComponents/LoaderShell/LoaderShell';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import AddVideoModal from '../../../VideoPageComponents/AddVideoModal/AddVideoModal';
import GroupAddExistingVideoModal from '../GroupAddExistingVideoModal/GroupAddExistingVideoModal';
import VideoGalleryHeader from '../VideoGalleryHeader/VideoGalleryHeader';
import VideoList from '../VideoList/VideoList';
import classes from './VideoGalleryContent.module.scss';

const VideoGalleryContent = ({currentUser, token, group, openAdd, openExisting, results, getResults, resetResults, isFetching, page, more, ...props}) => {
    return (
        <div className={classes.wrapper}>
            <VideoGalleryHeader currentUser={currentUser} group={group} openAdd={openAdd} openExisting={openExisting}/>
            <AddVideoModal currentUser={currentUser} opened={props.addOpened} setOpened={props.setAddOpened} addMethod={props.addMethod}/>
            <GroupAddExistingVideoModal currentUser={currentUser} group={group} token={token} opened={props.existingOpened} setOpened={props.setExistingOpened} addMethod={props.addExistingMethod}/>
            <LoaderShell getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} elementId={'videolist'}>
                <div>
                    {isFetching || !results ? <Preloader/> 
                        : <>{props.error 
                            ?   <div className={classes.errorScreen}>
                                    <span className={classes.errorText}>{props.error}</span>
                                </div>
                            :   <VideoList results={results} isFetching={isFetching} group={group}/>
                        }
                        </>
                    }
                </div>
            </LoaderShell>
        </div>
    );
};

export default VideoGalleryContent;