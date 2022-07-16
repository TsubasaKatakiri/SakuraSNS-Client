import React from 'react';
import classes from './MusicPageHeader.module.scss';
import { Add, MusicNote } from '@material-ui/icons';
import SimpleSearchForm from '../../MinorComponents/SimpleSearchForm/SimpleSearchForm';

const MusicPageHeader = ({searchQuery, setQueryMethod, handleOpenModal}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <MusicNote className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Music</h3>
                </div>
                <SimpleSearchForm isDark={isDark} query={searchQuery} setQueryMethod={setQueryMethod}/>
                <div className={classes.controlGroup}>
                    <div className={classes.control} onClick={handleOpenModal}>
                        <Add className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Upload</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPageHeader;