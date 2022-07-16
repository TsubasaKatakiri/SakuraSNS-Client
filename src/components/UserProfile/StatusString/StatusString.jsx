import React, { useState } from 'react';
import { Edit } from '@material-ui/icons';
import classes from './StatusString.module.scss';

const StatusString = ({profile, currentUser, token, changeStatus}) => {
    const isDark = document.body.classList.contains('dark');
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(profile.status);

    const enableEditMode = () => setEditMode(true);

    const disableEditMode = () => {
        const statusInfo = {id: currentUser._id, status: status};
        changeStatus(profile._id, statusInfo, token);
        setEditMode(false);
    }

    const setStatusChange = (e) => setStatus(e.target.value);

    if(profile._id !== currentUser._id){
        return <span className={classes.status}>{profile.status}</span>
    }

    return (
        <>
            {!editMode 
                ? <span className={classes.statusMessage} onDoubleClick={enableEditMode}>
                    {profile.status ? profile.status : 'You can set your status by double-clicking this message.'}
                    <Edit className={classes.statusIcon}/>
                </span> 
                : <input name='status' type='text' placeholder='Your status...' className={`${classes.input} ${isDark ? classes.night : ''}`} onBlur={disableEditMode} autoFocus={true} value={status} onChange={setStatusChange}/>
            }
        </>
    );
};

export default StatusString;