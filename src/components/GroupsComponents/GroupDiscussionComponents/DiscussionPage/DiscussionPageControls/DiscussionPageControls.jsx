import React from 'react';
import classes from './DiscussionPageControls.module.scss';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Delete } from '@material-ui/icons';

const DiscussionPageControls = ({isAllowed, discussion, isPrivate, isLocked, handleLock, handlePrivate, handleOpenDelete}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.info}>
                <h4 className={classes.name}>{discussion.discussionName}</h4>
                {isPrivate ? <VisibilityOffIcon className={classes.statusIcon}/> : ''}
                {isLocked ? <LockIcon className={classes.statusIcon}/> : ''}
            </div>
            <div className={classes.controlGroup}>
                {isAllowed 
                ?   <>{<>
                        {handleLock 
                            ?   <span className={classes.control} onClick={handleLock}>
                                    {isLocked ? <LockOpenIcon className={classes.controlIcon}/> : <LockIcon className={classes.controlIcon}/>}
                                    {isLocked ? 'Unlock' : 'Lock'}
                                </span>
                            :''
                        }
                        {!isLocked 
                            ? <>
                                <span className={classes.control} onClick={handlePrivate}>
                                    {isPrivate ? <VisibilityOffIcon className={classes.controlIcon}/> : <VisibilityOffIcon className={classes.controlIcon}/>}
                                    {isPrivate ? 'Make public' : 'Make Private'}
                                </span>
                                <span className={classes.control} onClick={handleOpenDelete}>
                                    <Delete className={classes.controlIcon}/>
                                    Delete
                                </span>   
                            </> 
                            : ''
                        }
                    </>}</>
                    : ''
                }
            </div>
        </div>
    );
};

export default DiscussionPageControls;