import React, { useEffect, useState } from 'react';
import classes from'./Music.module.scss'
import { getSearchedAudiofiles, addAudiofile, setFavoriteAudio, unsetFavoriteAudio, resetAudio } from '../../redux/Audio/AudioActions';
import { connect } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MusicPageContent from '../../components/MusicPageComponents/MusicPageContent/MusicPageContent';

const MusicPage = ({currentUser, token, music, page, totalPages, more, isFetching, getMusic, resetMusic, ...props}) => {
    const [opened, setOpened] = useState(false);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('term');
    const navigate = useNavigate();

    const getResults = (pageNumber) => {
        if(pageNumber) getMusic(searchQuery ? searchQuery : '', token, pageNumber);
        else getMusic(searchQuery ? searchQuery : '', token);
    }

    useEffect(() => {
        getResults();
        return () => resetMusic();
    }, [searchQuery]);

    const addMethod = (audioData) => {
        props.addAudiofile(audioData, token)
    }

    const handleOpenModal = () => setOpened(!opened);

    if(opened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const setQueryMethod = (query) => {
        navigate(query ? `/music?term=${query}` : `/music`);
    }

    return <MusicPageContent currentUser={currentUser} token={token} getResults={getResults} page={page} more={more} music={music} opened={opened} setOpened={setOpened} addMethod={addMethod} handleOpenModal={handleOpenModal} searchQuery={searchQuery} setQueryMethod={setQueryMethod} setFavorite={props.setFavorite} unsetFavorite={props.unsetFavorite} isFetching={isFetching} error={props.error}/>
};


const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        music: state.audio.music,
        page: state.audio.page,
        totalPages: state.audio.totalPages,
        more: state.audio.more,
        isFetching: state.audio.isFetching,
        error: state.audio.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMusic: (search, token, page) => {dispatch(getSearchedAudiofiles(search, token, page))},
        addAudiofile: (audiofile, token) => {dispatch(addAudiofile(audiofile, token))},
        setFavorite: (audioId, userId, token) => {dispatch(setFavoriteAudio(audioId, userId, token))},
        unsetFavorite: (audioId, userId, token) => {dispatch(unsetFavoriteAudio(audioId, userId, token))},
        resetMusic: () => {dispatch(resetAudio())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);