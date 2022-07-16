import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupAlbums, resetGroupAlbums } from '../../../../../redux/GroupMedia/GroupMediaActions';
import AlbumShell from '../../../../UserProfile/AlbumsWidget/AlbumShell/AlbumShell';

const AlbumsWidget = ({currentUser, token, group, albums, isFetching, error, getAlbums, resetAlbums}) => {
    useEffect(() => {
        getAlbums(group._id, token);
        return resetAlbums();
    }, [])

    return <AlbumShell group={group} albums={albums} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        albums: state.groupMedia.albums, 
        isFetching: state.groupMedia.isFetchingAlbums,
        error: state.groupMedia.errorAlbums,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbums: (userId, token) => {dispatch(getGroupAlbums(userId, token))},
        resetAlbums: () => {dispatch(resetGroupAlbums())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsWidget);