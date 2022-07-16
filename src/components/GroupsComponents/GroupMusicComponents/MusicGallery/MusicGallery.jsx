import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupMusic, removeGroupMusic, removeMusic, resetGroupMusic, setFavoriteGroupAudio, unsetFavoriteGroupAudio, uploadGroupMusic, addGroupMusic } from '../../../../redux/GroupMusic/GroupMusicActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import MusicPageContent from '../MusicPageContent/MusicPageContent';
import classes from './MusicGallery.module.scss';

const MusicGallery = ({currentUser, token, group, music, page, more, isFetching, error, getMusic, resetMusic, ...props}) => {
    const groupId = useParams().groupId;
    const [addOpened, setAddOpened] = useState(false);
    const [existingOpened, setExistingOpened] = useState(false);

    const handleOpenAddModal = () => setAddOpened(!addOpened);
    const handleOpenExistingModal = () => setExistingOpened(!existingOpened);

    if(addOpened || existingOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const getResults = (pageNumber) => {
        if(pageNumber) getMusic(groupId, token, pageNumber);
        else getMusic(groupId, token);
    }

    useEffect(() => {
        getResults();
        return resetMusic();
    }, [])

    const addMethod = (audioData) => {
        props.uploadMusic(audioData, token);
    }

    const addExistingMethod = (audioData) => {
        props.addMusic(groupId, audioData, token);
    }

    const deleteMethod = (audioId) => {
        props.removeMusic(audioId, currentUser._id, token);
    }

    const groupDeleteMethod = (audioId) => {
        props.removeGroupMusic(groupId, {userId: currentUser._id, audioId}, token);
    }

    return (
        <GroupPageContainer>
            <MusicPageContent currentUser={currentUser} token={token} group={group} openAdd={handleOpenAddModal} openExisting={handleOpenExistingModal} results={music} getResults={getResults} resetResults={resetMusic} isFetching={isFetching} error={error} page={page} more={more} setFavorite={props.setFavoriteAudio} unsetFavorite={props.unsetFavoriteAudio} addOpened={addOpened} setAddOpened={setAddOpened} addMethod={addMethod} deleteMethod={deleteMethod} groupDeleteMethod={groupDeleteMethod} existingOpened={existingOpened} setExistingOpened={setExistingOpened} addExistingMethod={addExistingMethod}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        music: state.groupMusic.music,
        page: state.groupMusic.page,
        totalPages: state.groupMusic.totalPages,
        more: state.groupMusic.more,
        isFetching: state.groupMusic.isFetching,
        error: state.groupMusic.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMusic: (groupId, token) => {dispatch(getGroupMusic(groupId, token))},
        resetMusic: () => {dispatch(resetGroupMusic())},
        uploadMusic: (audiofile, token) => {dispatch(uploadGroupMusic(audiofile, token))},
        addMusic: (groupId, audioData, token) => {dispatch(addGroupMusic(groupId, audioData, token))},
        removeGroupMusic: (groupId, audioData, token) => {dispatch(removeGroupMusic(groupId, audioData, token))},
        removeMusic: (audioId, groupData, token) => {dispatch(removeMusic(audioId, groupData, token))},
        setFavoriteAudio: (audioId, userId, token) => {dispatch(setFavoriteGroupAudio(audioId, userId, token))},
        unsetFavoriteAudio: (audioId, userId, token) => {dispatch(unsetFavoriteGroupAudio(audioId, userId, token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicGallery);