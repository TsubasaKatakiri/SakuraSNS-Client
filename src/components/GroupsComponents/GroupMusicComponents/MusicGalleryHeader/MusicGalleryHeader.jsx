import React from 'react';
import classes from './MusicGalleryHeader.module.scss';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { checkPolicy } from '../../../../util/CheckPolicy';
import { Add, ChevronLeft } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const MusicGalleryHeader = ({currentUser, group, openAdd, openExisting}) => {
    const isDark = document.body.classList.contains('dark');
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canUploadFiles);

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <LibraryMusicIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Group Music</h3>
                </div>
                <div className={classes.controlGroup}>
                    {isAllowed 
                    ?   <span className={classes.control} onClick={openAdd}>
                            <Add className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Add new</span>
                        </span>
                    : ''}
                    {isAllowed 
                    ?   <span className={classes.control} onClick={openExisting}>
                            <Add className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Add existing</span>
                        </span>
                    : ''}
                    <Link to={`/groups/${group._id}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To group</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MusicGalleryHeader;