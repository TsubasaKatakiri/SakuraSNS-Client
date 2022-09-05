import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserVideos, resetUserVideos } from '../../../redux/UserMedia/UserMediaActions';
import VideoShell from './VideoShell/VideoShell';

const VideoWidget = ({token, profile, videos, isFetching, error, getVideos, resetVideos}) => {
    useEffect(() => {
        getVideos(profile._id, token);
        return resetVideos();
    }, []) 

    return <VideoShell profile={profile} videos={videos} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        videos: state.userMedia.videos,
        isFetching: state.userMedia.isFetchingVideos,
        error: state.userMedia.errorVideos,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (userId, token, page) => {dispatch(getUserVideos(userId, token, page))},
        resetVideos: () => {dispatch(resetUserVideos())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoWidget);