import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserMusic, resetUserMusic } from '../../../redux/UserMedia/UserMediaActions';
import MusicShell from './MusicShell/MusicShell';

const MusicWidget = ({token, profile, music, isFetching, error, getMusic, resetMusic}) => {
    useEffect(() => {
        getMusic(profile._id, token);
        return resetMusic();
    }, [])

    return <MusicShell profile={profile} music={music} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        music: state.userMedia.music,
        isFetching: state.userMedia.isFetchingMusic,
        error: state.userMedia.errorMusic,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMusic: (userId, token, page) => {dispatch(getUserMusic(userId, token, page))},
        resetMusic: () => {dispatch(resetUserMusic())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicWidget);