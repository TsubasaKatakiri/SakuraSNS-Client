import React from 'react';
import WidgetShell from '../../../MinorComponents/WidgetShell/WidgetShell';
import classes from './AlbumShell.module.scss';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link } from 'react-router-dom';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import AlbumsShellContent from './AlbumShellContent';

const AlbumShell = ({group, profile, albums, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <section className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <PhotoLibraryIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>{group ? 'Group albums' : `${profile.lastName}'s albums`}</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`./albums`} className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    {isFetching || !albums
                    ? <Preloader/>
                    : <>{error
                        ? <span className={classes.message}>{error}</span>
                        : <AlbumsShellContent albums={albums}/>
                    }</>}
                </div>
            </section>
        </WidgetShell>
    );
};

export default AlbumShell;