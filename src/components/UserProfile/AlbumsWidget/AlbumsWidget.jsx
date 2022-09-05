import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserAlbums, resetUserAlbums } from '../../../redux/UserMedia/UserMediaActions';
import AlbumShell from './AlbumShell/AlbumShell';

const AlbumsWidget = ({token, profile, albums, isFetching, error, getAlbums, resetAlbums}) => {
    useEffect(() => {
        getAlbums(profile._id, token);
        return resetAlbums();
    }, [])

    return <AlbumShell profile={profile} albums={albums} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        albums: state.userMedia.albums, 
        isFetching: state.userMedia.isFetchingAlbums,
        error: state.userMedia.errorAlbums,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbums: (userId, token) => {dispatch(getUserAlbums(userId, token))},
        resetAlbums: () => {dispatch(resetUserAlbums())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsWidget);