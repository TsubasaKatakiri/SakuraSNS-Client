import React, { useEffect, useRef, useState } from 'react';
import classes from './MusicPlayingSystem.module.scss';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LoopIcon from '@mui/icons-material/Loop';
import { convertTime } from '../../../util/DateCalculations';

const MusicPlayingSystem = ({currentUser, track, setFavoriteMethod, unsetFavoriteMethod, changeNext, changePrev}) => {
    const isDark = document.body.classList.contains('dark');
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(100);
    const [length, setLength] = useState(null);
    const [timePlayed, setTimePlayed] = useState(0);
    const [progress, setProgress] = useState(0);
    const [finished, setFinished] = useState(false);

    const player = useRef();
    const volumeBar = useRef();
    const progressBar = useRef();
    const animationRef = useRef();

    const handleMute = () => {
        if(mute){
            setMute(false);
            player.current.muted = false;
            volumeBar.current.style.setProperty('--player-volume', `${volume}%`);
        } else {
            setMute(true);
            player.current.muted = true;
            volumeBar.current.style.setProperty('--player-volume', `0%`);
        }
    }

    const handleLoop = () => {
        if(loop){
            setLoop(false);
            player.current.loop = false; 
        } else {
            setLoop(true);
            player.current.loop = true;
        }
    }

    const finishPlaying = () => {
        setPlay(false);
        cancelAnimationFrame(animationRef.current);
        setTimePlayed(0);
        setProgress(0);
        progressBar.current.style.setProperty('--player-played', `0%`);
    }

    const startPlayback = () => {
        setPlay(true);
        animationRef.current = requestAnimationFrame(handleProgressAnimation);
        player?.current?.play();
    }

    const handleNext = () => {
        finishPlaying();
        changeNext();
    }

    const handlePrev = () => {
        finishPlaying();
        changePrev();
    }

    const handlePlay = () => {
        if(play){
            setPlay(false);
            cancelAnimationFrame(animationRef.current);
        } else {
            setPlay(true);
            animationRef.current = requestAnimationFrame(handleProgressAnimation);
        }
    }

    const enableFavorite = () => {
        setFavorite(true);
        setFavoriteMethod(track._id);
    } 

    const disableFavorite = () => {
        setFavorite(false);
        unsetFavoriteMethod(track._id);
    } 

    const handleProgressAnimation = () => {
        setTimePlayed(player?.current?.currentTime);
        const value = (100 * player?.current?.currentTime) / length;
        progressBar.current.style.setProperty('--player-played', `${value}%`);
        setProgress(value);
        animationRef.current = requestAnimationFrame(handleProgressAnimation);
    }

    const handleVolumeSet = () => {
        if(mute) {
            setMute(false);
            player.current.muted = false;
        }
        player.current.volume = (volumeBar.current.value / 100).toFixed(2);
        volumeBar.current.style.setProperty('--player-volume', `${volumeBar.current.value}%`);
        setVolume(volumeBar.current.value);
    }

    const handleProgressSet = () => {
        player.current.currentTime = Math.floor((progressBar.current.value / 100) * length);
        setTimePlayed(player.current.currentTime);
        progressBar.current.style.setProperty('--player-played', `${progressBar.current.value}%`);
        setProgress(progressBar.current.value)
    }

    useEffect(()=>{
        volumeBar?.current?.style.setProperty('--player-volume', `${volume}%`);
        progressBar?.current?.style.setProperty('--player-played', `${progress}%`);
        return () => {
            cancelAnimationFrame(animationRef.current);
        }
    }, [])

    useEffect(() => {
        if(play) {
            player?.current?.play();
        }
        else {
            player?.current?.pause();
        }
    }, [play])

    useEffect(() => {
        if(length){
            setFavorite(track.favorite.includes(currentUser._id));
            startPlayback();
        }
    }, [length])

    useEffect(() => {
        if(length && timePlayed && length <= timePlayed) setFinished(true);
    }, [length, timePlayed])

    useEffect(() => {
        if(finished){
            if(!loop) {
                handleNext();
            }
            setFinished(false);
        }
    }, [finished, loop])

    const setAudioData = () => {
        const time = Math.floor(player?.current?.duration); 
        setLength(time);
    }

    if(!track) return <></>

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.trackInfo}>
                <span className={classes.trackName}>
                    <span className={classes.artistName}>{track.artist}</span>&nbsp;-&nbsp;{track.name}
                </span>
            </div>
            <audio className={classes.audio} src={track.audiofile} ref={player} preload='metadata' onLoadedData={setAudioData}/>
            <div className={classes.trackPlayer}>
                <div className={classes.controls}>
                    <SkipPreviousIcon className={classes.control} onClick={handlePrev}/>
                    {play ? <PauseIcon className={classes.control} onClick={handlePlay}/> : <PlayArrowIcon className={classes.control} onClick={handlePlay}/>}
                    <SkipNextIcon className={classes.control} onClick={handleNext}/>
                </div>
                <div className={classes.controlTrack}>
                    <span className={classes.length}>{timePlayed ? convertTime(timePlayed) : '00:00'}</span>
                    <input type='range' className={classes.progress} ref={progressBar} onChange={handleProgressSet} value={progress}/>
                    <span className={classes.length}>{length ? convertTime(length) : '00:00'}</span>
                </div>
                <div className={classes.controls}>
                    {mute ? <VolumeOffIcon className={classes.control} onClick={handleMute}/> : <VolumeUpIcon className={classes.control} onClick={handleMute}/>}
                    <input type='range' className={classes.progressVolume} ref={volumeBar} onChange={handleVolumeSet} value={volume}/>
                </div>
                <div className={classes.controls}>
                    <LoopIcon className={`${classes.control} ${loop ? classes.active : ''}`} onClick={handleLoop}/>
                    {favorite ? <FavoriteIcon className={classes.control} onClick={disableFavorite}/> : <FavoriteBorderIcon className={classes.control} onClick={enableFavorite}/>}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayingSystem;