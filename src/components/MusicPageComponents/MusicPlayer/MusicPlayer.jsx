import React from 'react';
import MusicPlayingSystem from '../../MinorComponents/MusicPlayingSystem/MusicPlayingSystem';
import classes from './MusicPlayer.module.scss';

const MusicPlayer = ({currentUser, track, prev, next, changeNext, changePrev, setFavorite, unsetFavorite}) => {
    const isDark = document.body.classList.contains('dark');

    if(!track) return '';

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <MusicPlayingSystem currentUser={currentUser} track={track} prev={prev} next={next} changeNext={changeNext} changePrev={changePrev} setFavoriteMethod={setFavorite} unsetFavoriteMethod={unsetFavorite}/>
            </div>
        </div>
    );
};

export default MusicPlayer;