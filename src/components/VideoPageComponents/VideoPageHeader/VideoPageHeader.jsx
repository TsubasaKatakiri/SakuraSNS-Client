import React from 'react';
import { Add, Videocam } from '@material-ui/icons';
import SimpleSearchForm from '../../MinorComponents/SimpleSearchForm/SimpleSearchForm';
import classes from './VideoPageHeader.module.scss';

const VideoPageHeader = ({query, setQueryMethod, handleOpenModal}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <Videocam className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Video</h3>
                </div>
                <SimpleSearchForm query={query} setQueryMethod={setQueryMethod}/>
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

export default VideoPageHeader;