import React from 'react';
import classes from './AudioList.module.css';

const AudioList = ({audioContent}) => {
    if(audioContent.length === 0) return "";

    return (
        <div className={classes.audioList}>
            {audioContent.map(audio => {
                return <audio className={classes.audio} src={audio.file} controls key={audio._id}/>
            })}
        </div>
    );
};

export default AudioList;