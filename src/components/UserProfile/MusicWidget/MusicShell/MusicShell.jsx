import React from 'react';
import classes from './MusicShell.module.scss';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Link } from 'react-router-dom';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import MusicShellContent from './MusicShellContent';
import WidgetShell from '../../../MinorComponents/WidgetShell/WidgetShell';

const MusicShell = ({group, profile, music, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <section className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <LibraryMusicIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>{group ? 'Group music' : `${profile.lastName}'s music`}</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`./music`} className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    {(isFetching || !music) && !error
                    ? <Preloader/>
                    : <>{error && !music && !isFetching 
                        ? <span className={classes.message}>{error}</span>
                        : <MusicShellContent music={music}/>
                    }</>}
                </div>
            </section>
        </WidgetShell>
    );
};

export default MusicShell;