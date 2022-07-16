import React, { useEffect, useState } from 'react';
import LoaderShell from '../../../MinorComponents/LoaderShell/LoaderShell';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import MusicList from '../../../MusicPageComponents/MusicList/MusicList';
import MusicPlayer from '../../../MusicPageComponents/MusicPlayer/MusicPlayer';
import classes from './MusicPageContent.module.scss';
import AddMusicModal from '../../../MusicPageComponents/AddMusicModal/AddMusicModal';
import MusicGalleryHeader from '../MusicGalleryHeader/MusicGalleryHeader';
import GroupAddExistingAudioModal from '../GroupAddExistingMusicModal/GroupAddExistingAudioModal';

const MusicPageContent = ({currentUser, token, group, openAdd, openExisting, results, getResults, resetResults, isFetching, page, more, setFavorite, unsetFavorite, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const [currentTrack, setCurrentTrack] = useState(null);
    const [previousTrack, setPreviousTrack] = useState(null);
    const [nextTrack, setNextTrack] = useState(null);

    const setCurrent = (id) => {
        const position = results.map(m => m._id).indexOf(id);
        setCurrentTrack(results[position]);
    }

    const handleNext = () => {
        const pos = results.map(m => m._id).indexOf(currentTrack._id);
        setCurrentTrack(pos === results.length - 1 ? results[0] : results[pos + 1]);
    }

    const handlePrev = () => {
        const pos = results.map(m => m._id).indexOf(currentTrack._id);
        setCurrentTrack(pos === 0 ? results[results.length - 1] : results[pos - 1]);
    }

    useEffect(() => {
        if(currentTrack){
            const pos = results.map(m => m._id).indexOf(currentTrack._id);
            setPreviousTrack(pos === 0 ? results[results.length - 1] : results[pos - 1]);
            setNextTrack(pos === results.length - 1 ? results[0] : results[pos + 1]);
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
            <MusicGalleryHeader currentUser={currentUser} group={group} openAdd={openAdd} openExisting={openExisting}/>
            <AddMusicModal currentUser={currentUser} group={group} opened={props.addOpened} setOpened={props.setAddOpened} addMethod={props.addMethod}/>
            <GroupAddExistingAudioModal currentUser={currentUser} group={group} token={token} opened={props.existingOpened} setOpened={props.setExistingOpened} addMethod={props.addExistingMethod}/>
            <LoaderShell getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} elementId={'audiolist'}>
                <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                    {isFetching || !results ? <Preloader/> 
                        : <>{props.error 
                            ?   <div className={classes.errorScreen}>
                                    <span className={classes.errorText}>{props.error}</span>
                                </div>
                            : <MusicList music={results} isFetching={isFetching} currentTrack={currentTrack} setFavorite={setFavoriteMethod} unsetFavorite={unsetFavoriteMethod} setCurrent={setCurrent} currentUser={currentUser} token={token} deleteMethod={props.deleteMethod} group={group} groupDeleteMethod={props.groupDeleteMethod}/>
                        }
                        </>
                    }
                </div>
            </LoaderShell>
            <MusicPlayer currentUser={currentUser} track={currentTrack} prev={previousTrack} next={nextTrack} changeNext={handleNext} changePrev={handlePrev} setFavorite={unsetFavoriteMethod} unsetFavorite={unsetFavoriteMethod}/>
        </div>
    );
};

export default MusicPageContent;