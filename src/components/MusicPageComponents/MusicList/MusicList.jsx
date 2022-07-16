import React from 'react';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import MusicEntry from './MusicEntry/MusicEntry';
import classes from './MusicList.module.scss';
import LoaderShell from './../../MinorComponents/LoaderShell/LoaderShell';

const MusicList = ({music, isFetching, setFavorite, unsetFavorite, deleteMethod, currentUser, currentTrack, setCurrent, token, group, groupDeleteMethod, ...props}) => {
    return (
        <LoaderShell getResults={props.getResults} isFetching={isFetching} page={props.page} more={props.more} elementId={'audiolist'}>
            <div className={classes.wrapper}>
                <div id='audiolist' className={classes.audioList}>
                    {music.map((track, index) => {
                        return <MusicEntry currentUser={currentUser} index={index} track={track} setCurrentTrack={setCurrent} setFavoriteMethod={setFavorite} unsetFavoriteMethod={unsetFavorite} current={currentTrack} deleteMethod={deleteMethod} key={track._id} group={group} groupDeleteMethod={groupDeleteMethod}/>
                    })}
                    {isFetching && music ? <Preloader/> : ''}
                </div>
            </div>
        </LoaderShell>
    );
};

export default MusicList;