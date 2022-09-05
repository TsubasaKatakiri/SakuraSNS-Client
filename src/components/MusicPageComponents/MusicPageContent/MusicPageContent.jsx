import React, { useEffect, useState } from 'react';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import classes from './MusicPageContent.module.scss';
import AddMusicModal from '../AddMusicModal/AddMusicModal';
import MusicPageHeader from '../MusicPageHeader/MusicPageHeader';
import MusicList from '../MusicList/MusicList';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

const MusicPageContent = ({currentUser, token, music, opened, setOpened, addMethod, handleOpenModal, searchQuery, setQueryMethod, setFavorite, unsetFavorite, isFetching, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const [currentTrack, setCurrentTrack] = useState(null);
    const [previousTrack, setPreviousTrack] = useState(null);
    const [nextTrack, setNextTrack] = useState(null);

    const setCurrent = (id) => {
        const position = music.map(m => m._id).indexOf(id);
        setCurrentTrack(music[position]);
    }

    const handleNext = () => {
        const pos = music.map(m => m._id).indexOf(currentTrack._id);
        setCurrentTrack(pos === music.length - 1 ? music[0] : music[pos + 1]);
    }

    const handlePrev = () => {
        const pos = music.map(m => m._id).indexOf(currentTrack._id);
        setCurrentTrack(pos === 0 ? music[music.length - 1] : music[pos - 1]);
    }

    useEffect(() => {
        if(currentTrack){
            const pos = music.map(m => m._id).indexOf(currentTrack._id);
            setPreviousTrack(pos === 0 ? music[music.length - 1] : music[pos - 1]);
            setNextTrack(pos === music.length - 1 ? music[0] : music[pos + 1]);
        }
    }, [currentTrack])

    const setFavoriteMethod = (trackId) => {
        setFavorite(trackId, {userId: currentUser._id}, token);
    }

    const unsetFavoriteMethod = (trackId) => {
        unsetFavorite(trackId, {userId: currentUser._id}, token);
    }

    return (
        <div className={classes.wrapper}>
            <MusicPageHeader searchQuery={searchQuery} setQueryMethod={setQueryMethod} handleOpenModal={handleOpenModal}/>
            <AddMusicModal currentUser={currentUser} opened={opened} setOpened={setOpened} addMethod={addMethod}/>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                {isFetching || !music ? <Preloader/> 
                    : <>{props.error 
                        ?   <div className={classes.errorScreen}>
                                <span className={classes.errorText}>{props.error}</span>
                            </div>
                        : <MusicList music={music} getResults={props.getResults} page={props.page} more={props.more} isFetching={isFetching} currentTrack={currentTrack} setFavorite={setFavoriteMethod} unsetFavorite={unsetFavoriteMethod} setCurrent={setCurrent} currentUser={currentUser} token={token}/>
                    }
                    </>
                }
            </div>
            <MusicPlayer currentUser={currentUser} track={currentTrack} prev={previousTrack} next={nextTrack} changeNext={handleNext} changePrev={handlePrev} setFavorite={setFavoriteMethod} unsetFavorite={unsetFavoriteMethod}/>
        </div>
    );
};

export default MusicPageContent;