import React from 'react';
import { ChevronLeft, Videocam } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import SimpleSearchForm from '../../MinorComponents/SimpleSearchForm/SimpleSearchForm';
import classes from './VideoSearchHeader.module.scss';

const VideoSearchHeader = ({query, setQueryMethod}) => {
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
                    <Link to={`/video`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To main page</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VideoSearchHeader;