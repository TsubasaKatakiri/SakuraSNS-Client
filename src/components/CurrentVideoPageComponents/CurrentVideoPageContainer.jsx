import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideos, resetVideos } from '../../redux/Video/VideoActions';
import { followUnfollowProfile } from './../../redux/Auth/AuthActions';
import { getVideo, resetVideo } from './../../redux/CurrentVideo/CurrentVideoActions';
import { getGroup, resetGroup } from '../../redux/Group/GroupActions';
import Preloader from '../MinorComponents/Preloader/Preloader';
import CurrentVideoPage from './CurrentVideoPage';

const CurrentVideoPageContainer = ({currentUser, token, videos, group, currentVideo, getVideo, getVideos, getGroup, resetVideos, resetVideo, resetGroup, ...props}) => {
    const videoId = useParams().videoId;
    const groupId = useParams().groupId;
    const navigate = useNavigate();

    useEffect(()=>{
        getVideo(videoId, token);
        if(groupId) getGroup(groupId, token);
        return () => {
            resetVideo();
            resetGroup();
        }
    }, [videoId]);

    const setQueryMethod = (query) => {
        navigate(query ? `/video/search?term=${query}` : `/video/search`);
    }

    if((!currentVideo || props.isFetchingCurrent) || (!group && props.isFetchingGroup))  return <Preloader/>

    return <CurrentVideoPage currentUser={currentUser} token={token} videos={videos} group={group} currentVideo={currentVideo} userFriends={props.userFriends} followUnfollow={props.followUnfollowProfile} followInProgress={props.followInProgress} setQueryMethod={setQueryMethod}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        userFriends: state.auth.userFriends,
        followInProgress: state.auth.followInProgress,
        videos: state.video.videos,
        isFetching: state.video.isFetching,
        currentVideo: state.currentVideo.currentVideo,
        isFetchingCurrent: state.currentVideo.isFetchingCurrent,
        group: state.group.group,
        isFetchingGroup: state.group.isFetching,
        errorGroup: state.group.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followUnfollowProfile: (userId, currentId, token) => {dispatch(followUnfollowProfile(userId, currentId, token))},
        getVideos: (token) => {dispatch(getVideos(token))},
        resetVideos: () => {dispatch(resetVideos())},        
        getVideo: (id, token) => {dispatch(getVideo(id, token))},
        resetVideo: () => {dispatch(resetVideo())},
        getGroup: (groupId, token) => {dispatch(getGroup(groupId, token))},
        resetGroup: () => {dispatch(resetGroup())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentVideoPageContainer);