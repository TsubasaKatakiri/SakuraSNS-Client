import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFavoriteVideos, resetGalleryVideos } from '../../../../redux/VideoGallery/VideoGalleryActions';
import VideoList from '../VideoList/VideoList';

const VideoFavoriteList = ({setFavoriteMode, currentUser, profile, token, videos, getVideos, resetVideos, isFetching, error, page, more, ...props}) => {
    const profileId = useParams().userId;

    useEffect(() => {
        setFavoriteMode(true);
        return () => setFavoriteMode(false);
    }, [])

    const getResults = (pageNumber) => {
        if(pageNumber) getVideos(profileId, token, pageNumber);
        else getVideos(profileId, token);
    }

    return <VideoList videos={videos} isFetching={isFetching} error={error} getResults={getResults} resetResults={resetVideos} page={page} more={more}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        videos: state.galleryVideo.videos,
        page: state.galleryVideo.page,
        totalPages: state.galleryVideo.totalPages,
        more: state.galleryVideo.more,
        isFetching: state.galleryVideo.isFetching,
        error: state.galleryVideo.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (userId, token, page) => {dispatch(getFavoriteVideos(userId, token, page))},
        resetVideos: () => {dispatch(resetGalleryVideos())},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoFavoriteList);