import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideos, getVideosOfGroup, resetVideos } from '../../../redux/Video/VideoActions';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import VideoRibbon from './VideoRibbon';

const VideoRibbonContainer = ({token, videos, group, isFetching, currentVideo, getVideos, getVideosOfGroup, resetVideos}) => {
    const groupId = useParams().groupId;

    useEffect(() => {
        if(groupId) {
            getVideosOfGroup(group._id, token)
        }
        else getVideos(token);
        return () => resetVideos();
    }, [groupId]);

    if(!videos || isFetching) return <Preloader/>;

    return <VideoRibbon videos={videos} currentVideo={currentVideo} group={group}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        videos: state.video.videos,
        currentVideo: state.currentVideo.currentVideo,
        isFetching: state.video.isFetching,
        error: state.video.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (token) => {dispatch(getVideos(token))},
        getVideosOfGroup: (groupId, token) => {dispatch(getVideosOfGroup(groupId, token))},
        resetVideos: () => {dispatch(resetVideos())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoRibbonContainer);