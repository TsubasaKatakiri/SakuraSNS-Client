import React from 'react';
import classes from './UserAlbumControls.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Delete, Edit } from '@material-ui/icons';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UserAlbumControls = ({album, isAllowed, isLocked, handleLock, isPrivate, handlePrivate, openUpdateModal, openDeleteModal}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.info}>
                <h4 className={classes.name}>{album.name}</h4>
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
                                    {isPrivate ? <VisibilityIcon className={classes.controlIcon}/> : <VisibilityOffIcon className={classes.controlIcon}/>}
                                    {isPrivate ? 'Make public' : 'Make Private'}
                                </span>
                                <span className={classes.control} onClick={openUpdateModal}>
                                    <Edit className={classes.controlIcon}/>
                                    Edit
                                </span>
                                {!album.albumSettings.isRootAlbum 
                                    ?   <span className={classes.control} onClick={openDeleteModal}>
                                            <Delete className={classes.controlIcon}/>
                                            Delete
                                        </span>
                                    : ''
                                }     
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

export default UserAlbumControls;