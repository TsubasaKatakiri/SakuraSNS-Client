import React from 'react';
import MusicPlayer from '../../../MinorComponents/MusicPlayer/MusicPlayer';
import classes from './MusicShell.module.scss';

const MusicShellContent = ({music}) => {
    const musicList = music.length > 3 ? music.slice(0, 3) : music;

    return (
        <>
            {musicList.length > 0
                ? <>
                    {musicList.map(music => {
                        return <MusicPlayer music={music} key={music._id}/>
                    })}
                </>
                : <span className={classes.message}>No music is currently here.</span>
            }
        </>
    );
};

export default MusicShellContent;