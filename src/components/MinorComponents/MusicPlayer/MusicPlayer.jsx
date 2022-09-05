import React, { useEffect, useState }  from 'react';
import classes from './MusicPlayer.module.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LoopIcon from '@mui/icons-material/Loop';
import { useRef } from 'react';

const MusicPlayer = ({music}) => {
    const isDark = document.body.classList.contains('dark');

    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(100);
    const [length, setLength] = useState(0);
    const [timePlayed, setTimePlayed] = useState(0);
    const [progress, setProgress] = useState(0);

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

    const handleProgressAnimation = () => {
        setTimePlayed(player.current.currentTime);
        const value = (100 * player?.current?.currentTime) / length;
        progressBar.current.style.setProperty('--player-played', `${value}%`);
        setProgress(value);
        animationRef.current = requestAnimationFrame(handleProgressAnimation);
    }

    const convertTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const seconds = Math.round(sec - (minutes * 60));
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const handleVolumeSet = () => {
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

    const handlePlay = () => {
        if(play){
            setPlay(false);
            cancelAnimationFrame(animationRef.current);
        } else {
            setPlay(true);
            animationRef.current = requestAnimationFrame(handleProgressAnimation);
        }
    }

    useEffect(() => {
        volumeBar.current.style.setProperty('--player-volume', `${volume}%`);
        progressBar.current.style.setProperty('--player-played', `${progress}%`);
        return () => {
            cancelAnimationFrame(animationRef.current);
        }
    }, [])

    useEffect(() => {
        if(play) {
            player.current.play();
        }
        else {
            player.current.pause();
        }
    }, [play])

    useEffect(() => {
        if(length <= timePlayed) {
            if(!loop) {
                setPlay(false);
                cancelAnimationFrame(animationRef.current);
            }
        }
    }, [length, timePlayed])


    const setAudioData = () => {
        const time = Math.floor(player?.current?.duration); 
        setLength(time);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.trackInfo}>
                <span className={classes.trackName}>
                    <span className={classes.artistName}>{music.artist}</span>&nbsp;-&nbsp;{music.name}
                </span>
            </div>
            <audio className={classes.audio} src={music.audiofile} ref={player} preload='metadata' onLoadedData={setAudioData}/>
            <div className={classes.trackPlayer}>
                <div className={classes.controls}>
                    {play ? <PauseIcon className={classes.control} onClick={handlePlay}/> : <PlayArrowIcon className={classes.control} onClick={handlePlay}/>}
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
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;