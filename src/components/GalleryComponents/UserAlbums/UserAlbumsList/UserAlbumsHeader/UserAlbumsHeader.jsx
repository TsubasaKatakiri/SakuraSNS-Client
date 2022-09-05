import React from 'react';
import classes from './UserAlbumsHeader.module.scss';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Add, ChevronLeft } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';

const UserAlbumsHeader = ({isAllowed, profile, group, handleOpenModal}) => {
    const isDark = document.body.classList.contains('dark');
    const profileId = useParams().userId;
    const groupId = useParams().groupId;

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <PhotoLibraryIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>{group ? 'Group albums' : `${profile.username}'s Albums`}</h3>
                </div>
                <div className={classes.controlGroup}>
                    {isAllowed 
                        ?   <span className={classes.control} onClick={handleOpenModal}>
                                <Add className={classes.controlIcon}/>
                                <span className={classes.controlCaption}>Add...</span>
                            </span>
                        : ''
                    }
                    <Link to={group ? `/groups/${groupId}` : `/profile/${profileId}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>{group ? 'To group' : 'To profile'}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserAlbumsHeader;