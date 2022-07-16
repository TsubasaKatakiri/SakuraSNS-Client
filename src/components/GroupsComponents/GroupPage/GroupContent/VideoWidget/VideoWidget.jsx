import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupVideos, resetGroupVideos } from '../../../../../redux/GroupMedia/GroupMediaActions';
import VideoShell from '../../../../UserProfile/VideoWidget/VideoShell/VideoShell';

const VideoWidget = ({currentUser, token, group, videos, isFetching, error, getVideos, resetVideos}) => {
    useEffect(() => {
        getVideos(group._id, token);
        return resetVideos();
    }, []) 

    return <VideoShell group={group} videos={videos} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        videos: state.groupMedia.videos,
        isFetching: state.groupMedia.isFetchingVideos,
        error: state.groupMedia.errorVideos,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideos: (userId, token, page) => {dispatch(getGroupVideos(userId, token, page))},
        resetVideos: () => {dispatch(resetGroupVideos())},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoWidget);