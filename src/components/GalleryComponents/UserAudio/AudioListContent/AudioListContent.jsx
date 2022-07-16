import React, { useEffect, useState } from 'react';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import classes from './AudioListContent.module.scss'
import MusicList from './../../../MusicPageComponents/MusicList/MusicList';
import MusicPlayer from '../../../MusicPageComponents/MusicPlayer/MusicPlayer';

const AudioListContent = ({currentUser, token, music, isFetching, error, setFavorite, unsetFavorite, deleteAudio}) => {
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

    const deleteMethod = (trackId) => {
        deleteAudio(trackId, currentUser._id, token);
    }

    const setFavoriteMethod = (trackId) => {
        setFavorite(trackId, {userId: currentUser._id}, token);
    }

    const unsetFavoriteMethod = (trackId) => {
        unsetFavorite(trackId, {userId: currentUser._id}, token);
    }

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.musicList}>
                    {isFetching || !music ? <Preloader/> 
                        : <>{error 
                            ?   <div className={classes.errorScreen}>
                                    <span className={classes.errorText}>{error}</span>
                                </div>
                            : <MusicList music={music} isFetching={isFetching} currentTrack={currentTrack} setFavorite={setFavoriteMethod} unsetFavorite={unsetFavoriteMethod} setCurrent={setCurrent} currentUser={currentUser} token={token} deleteMethod={deleteMethod}/>
                        }
                        </>
                    }
                </div>
                <MusicPlayer currentUser={currentUser} track={currentTrack} prev={previousTrack} next={nextTrack} changeNext={handleNext} changePrev={handlePrev} setFavorite={setFavoriteMethod} unsetFavorite={unsetFavoriteMethod}/>
            </div>
        </div>
    );
};

export default AudioListContent;