import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupMusic, resetGroupMusic } from '../../../../../redux/GroupMedia/GroupMediaActions';
import MusicShell from '../../../../UserProfile/MusicWidget/MusicShell/MusicShell';

const MusicWidget = ({currentUser, token, group, music, isFetching, error, getMusic, resetMusic}) => {
    useEffect(() => {
        getMusic(group._id, token);
        return resetMusic();
    }, [])

    return <MusicShell group={group} music={music} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        music: state.groupMedia.music,
        isFetching: state.groupMedia.isFetchingMusic,
        error: state.groupMedia.errorMusic,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMusic: (userId, token, page) => {dispatch(getGroupMusic(userId, token, page))},
        resetMusic: () => {dispatch(resetGroupMusic())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicWidget);