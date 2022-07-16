import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteAudio, getUploadedAudio, resetUserAudio, setFavoriteGalleryAudio, unsetFavoriteGalleryAudio } from '../../../../redux/AudioGallery/AudioGalleryActions';
import AudioList from '../AudioList/AudioList';

const AudioUploadedList = ({setUploadedMode, currentUser, profile, token, music, getUploadedAudio, resetUserAudio, isFetching, error, page, more, ...props}) => {
    const profileId = useParams().userId;

    useEffect(() => {
        setUploadedMode(true);
        return () => setUploadedMode(false);
    }, [])

    const getResults = (pageNumber) => {
        if(pageNumber) getUploadedAudio(profileId, token, pageNumber);
        else getUploadedAudio(profileId, token);
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
        getUploadedAudio: (userId, token, page) => {dispatch(getUploadedAudio(userId, token, page))},
        resetUserAudio: () => {dispatch(resetUserAudio())},
        deleteAudio: (audioId, userId, token) => {dispatch(deleteAudio(audioId, userId, token))},
        setFavoriteAudio: (audioId, userId, token) => {dispatch(setFavoriteGalleryAudio(audioId, userId, token))},
        unsetFavoriteAudio: (audioId, userId, token) => {dispatch(unsetFavoriteGalleryAudio(audioId, userId, token))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioUploadedList);