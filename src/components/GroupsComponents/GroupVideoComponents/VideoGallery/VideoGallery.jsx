import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import VideoGalleryContent from '../VideoGalleryContent/VideoGalleryContent';
import { addGroupVideofile, getGroupVideos, resetGroupVideo, uploadGroupVideofile } from './../../../../redux/GroupVideo/GroupVideoActions';

const VideoGallery = ({currentUser, token, group, videos, page, more, isFetching, error, getVideos, resetVideos, uploadVideo, addVideo}) => {
    const groupId = useParams().groupId;
    const [addOpened, setAddOpened] = useState(false);
    const [existingOpened, setExistingOpened] = useState(false);

    const handleOpenAdd = () => setAddOpened(!addOpened);
    const handleOpenExisting = () => setExistingOpened(!existingOpened);

    const getResults = (pageNumber) => {
        if(pageNumber) getVideos(groupId, token, pageNumber);
        else getVideos(groupId, token);
    }

    useEffect(() => {
        getResults();
        return resetVideos();
    }, [])

    const addMethod = (videoData) => {
        uploadVideo(videoData, token);
    }

    const addExistingMethod = (videoData) => {
        addVideo(groupId, videoData, token);
    }

    return (
        <GroupPageContainer>
            <VideoGalleryContent currentUser={currentUser} token={token} group={group} openAdd={handleOpenAdd} openExisting={handleOpenExisting} results={videos} getResults={getResults} resetResults={resetVideos} isFetching={isFetching} page={page} more={more} error={error} addOpened={addOpened} setAddOpened={setAddOpened} addMethod={addMethod} existingOpened={existingOpened} setExistingOpened={setExistingOpened} addExistingMethod={addExistingMethod}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        videos: state.groupVideo.videos,
        page: state.groupVideo.page,
        totalPages: state.groupVideo.totalPages,
        more: state.groupVideo.more,
        isFetching: state.groupVideo.isFetching,
        error: state.groupVideo.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (groupId, token, page) => {dispatch(getGroupVideos(groupId, token, page))},
        resetVideos: () => {dispatch(resetGroupVideo())},
        uploadVideo: (videofile, token) => {dispatch(uploadGroupVideofile(videofile, token))},
        addVideo: (groupId, videoData, token) => {dispatch(addGroupVideofile(groupId, videoData, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoGallery);