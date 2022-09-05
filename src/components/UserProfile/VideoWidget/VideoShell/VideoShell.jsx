import React from 'react';
import WidgetShell from '../../../MinorComponents/WidgetShell/WidgetShell';
import classes from './VideoShell.module.scss';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Link } from 'react-router-dom';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import VideoShellContent from './VideoShellContent';

const VideoShell = ({group, profile, videos, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <VideoLibraryIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>{group ? 'Group videos' : `${profile.lastName}'s videos`}</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`./videos`} className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    {(isFetching || !videos) && !error
                    ? <Preloader/>
                    : <>{error && !videos && !isFetching
                        ? <span className={classes.message}>{error}</span>
                        : <VideoShellContent videos={videos} group={group}/>
                    }</>}
                </div>
            </div>
        </WidgetShell>
    );
};

export default VideoShell;