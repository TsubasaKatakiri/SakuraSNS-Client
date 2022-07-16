import React, {  useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteAudio, getFavoriteAudio, resetUserAudio, setFavoriteGalleryAudio, unsetFavoriteGalleryAudio } from '../../../../redux/AudioGallery/AudioGalleryActions';
import AudioList from '../AudioList/AudioList';

const AudioFavoriteList = ({setFavoriteMode, currentUser, profile, token, music, getFavoriteAudio, resetUserAudio, isFetching, error, page, more, ...props}) => {
    const profileId = useParams().userId;

    useEffect(() => {
        setFavoriteMode(true);
        return () => setFavoriteMode(false);
    }, [])

    const getResults = (pageNumber) => {
        if(pageNumber) getFavoriteAudio(profileId, token, pageNumber);
        else getFavoriteAudio(profileId, token);
    }

    return <AudioList music={music} page={page} more={more} getResults={getResults} resetResults={resetUserAudio} isFetching={isFetching} error={error} setFavoriteAudio={props.setFavoriteAudio} unsetFavoriteAudio={props.unsetFavoriteAudio} currentUser={currentUser} token={token} deleteAudio={props.deleteAudio}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        music: state.galleryAudio.music,
        page: state.galleryAudio.page,
        totalPages: state.galleryAudio.totalPages,
        more: state.galleryAudio.more,
        isFetching: state.galleryAudio.isFetching,
        error: state.galleryAudio.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteAudio: (userId, token, page) => {dispatch(getFavoriteAudio(userId, token, page))},
        resetUserAudio: () => {dispatch(resetUserAudio())},
        deleteAudio: (audioId, userId, token) => {dispatch(deleteAudio(audioId, userId, token))},
        setFavoriteAudio: (audioId, userId, token) => {dispatch(setFavoriteGalleryAudio(audioId, userId, token))},
        unsetFavoriteAudio: (audioId, userId, token) => {dispatch(unsetFavoriteGalleryAudio(audioId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioFavoriteList);