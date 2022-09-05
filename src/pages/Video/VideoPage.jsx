import React, { useCallback, useEffect, useState } from 'react';
import classes from './VideoPage.module.scss';
import { addVideofile, getVideos, resetVideos } from '../../redux/Video/VideoActions';
import { connect } from 'react-redux';
import VideoPageContent from '../../components/VideoPageComponents/VideoPageContent/VideoPageContent';
import { useNavigate } from 'react-router-dom';

const VideoPage = ({currentUser, token, videos, page, totalPages, more, isFetching, getVideos, resetVideos, addVideofile, ...props}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setModalOpened(!modalOpened);

    if(modalOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const getResults = (pageNumber) => {
        if(pageNumber) getVideos(token, pageNumber);
        else getVideos(token);
    } 

    useEffect(() => {
        getResults(token);
        return () => resetVideos();
    }, []);

    const addMethod = (video) => {
        addVideofile(video, token);
    }

    const setQueryMethod = (query) => {
        navigate(query ? `/video/search?term=${query}` : `/video/search`);
    }

    return <VideoPageContent currentUser={currentUser} getResults={getResults} page={page} more={more} opened={modalOpened} setOpened={setModalOpened} addMethod={addMethod} videos={videos} isFetching={isFetching} error={props.error} handleOpenModal={handleOpenModal} setQueryMethod={setQueryMethod}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        videos: state.video.videos,
        page: state.video.page,
        totalPages: state.video.totalPages,
        more: state.video.more,
        isFetching: state.video.isFetching,
        error: state.video.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (token, page) => {dispatch(getVideos(token, page))},
        addVideofile: (videofile, token) => {dispatch(addVideofile(videofile, token))},
        resetVideos: () => {dispatch(resetVideos())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);