import React from 'react';
import classes from './MusicEntry.module.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NumbersIcon from '@mui/icons-material/Numbers';
import { Favorite, FavoriteBorder, Delete } from '@material-ui/icons';
import { useState } from 'react';
import { useRef } from 'react';
import { convertTime } from '../../../../util/DateCalculations';
import DeletionModal from '../../../MinorComponents/DeletionModal/DeletionModal';
import { checkPolicy } from '../../../../util/CheckPolicy';

const MusicEntry = ({currentUser, index, track, current, setCurrentTrack, setFavoriteMethod, unsetFavoriteMethod, deleteMethod, group, groupDeleteMethod}) => {
    const isDark = document.body.classList.contains('dark');
    const [opened, setOpened] = useState(false);
    const [openedGroup, setOpenedGroup] = useState(false);
    const [favorite, setFavorite] = useState(track.favorite.includes(currentUser._id));
    const [idVisible, setIdVisible] = useState(false);
    const [length, setLength] = useState(0);
    const isCurrent = current ? track._id === current._id : false;

    const music = useRef();

    const handleIdVisibility = () => setIdVisible(!idVisible);
    const handleOpenDelete = () => setOpened(!opened);
    const handleOpenGroupDelete = () => setOpenedGroup(!openedGroup);

    const enableFavorite = () => {
        setFavoriteMethod(track._id);
        setFavorite(true);
    }

    const disableFavorite = () => {
        unsetFavoriteMethod(track._id);
        setFavorite(false);
    }

    const setAudioData = () => {
        const time = Math.floor(music?.current?.duration); 
        setLength(time);
    }

    const handleDelete = () => {
        deleteMethod(track._id);
    }

    const handleGroupDelete = () => {
        groupDeleteMethod(track._id);
    }

    const setTrack = (e) => {
        if(!e.target.closest('span')) setCurrentTrack(track._id);
    }

    if(opened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`} onClick={setTrack}>
            <audio className={classes.audio} src={track.audiofile} ref={music} preload='metadata' onLoadedData={setAudioData}/>
            <p className={classes.trackIndex}>#{index + 1}</p>
            <div className={`${classes.trackData} ${isCurrent ? classes.current : ''}`}>
                <p className={classes.trackName}>{track.name}</p>
                <p className={classes.trackArtist}>{track.artist}</p>
            </div>
            <div className={classes.trackControls}>
                <div className={classes.trackIdContainer}>
                    {idVisible 
                    ? <p className={classes.trackId}>Track ID: {track._id}</p>
                    : ''}
                </div>
                <div className={classes.controlsContainer}>
                    <div className={classes.trackAdditionalInfo}>
                        <div className={classes.info}>
                            <AccessTimeIcon className={classes.infoIcon}/>
                            <p className={classes.infoText}>{length ? convertTime(length) : '00:00'}</p>
                        </div>
                    </div>
                    <div className={classes.controls}>
                        <span className={classes.control} onClick={handleIdVisibility}>
                            <NumbersIcon className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>TrackID</span>
                        </span>
                        {favorite 
                            ? <span className={classes.controlFavorite} onClick={disableFavorite}>
                                <Favorite className={classes.controlIcon}/>
                            </span>
                            : <span className={classes.controlFavorite} onClick={enableFavorite}>
                                <FavoriteBorder className={classes.controlIcon}/>
                            </span>
                        }
                        {deleteMethod && track.uploader === currentUser._id
                            ? <span className={classes.control} onClick={handleOpenDelete}>
                                <Delete className={classes.controlIcon}/>
                            </span>
                            : ''
                        }
                        {group 
                        ?   <>{track.uploader === currentUser._id || checkPolicy(group, currentUser._id, group.policies.canUploadFiles)
                                ?   <span className={classes.control} onClick={handleOpenGroupDelete}>
                                        <Delete className={classes.controlIcon}/>
                                        <span className={classes.controlCaption}>G.Delete</span>
                                    </span>
                                : ''
                            }</>
                        :   ''}
                    </div>
                </div>
            </div>
            <DeletionModal caption={'Do you want to delete this music track?'} opened={opened} setOpened={setOpened} deleteMethod={handleDelete}/>
            <DeletionModal caption={'Do you want to delete this audio track from group?'} opened={openedGroup} setOpened={setOpenedGroup} deleteMethod={handleGroupDelete}/>
        </div>
    );
};

export default MusicEntry;