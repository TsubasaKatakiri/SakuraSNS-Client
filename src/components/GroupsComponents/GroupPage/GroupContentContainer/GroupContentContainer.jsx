import React, { useState } from 'react';
import classes from './GroupContentContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import {checkIsBanned, checkIsMember } from '../../../../util/CheckPolicy';
import GroupContent from '../GroupContent/GroupContent';
import LockIcon from '@mui/icons-material/Lock';
import GroupHeader from './GroupHeader/GroupHeader';
import LockPage from '../../../MinorComponents/LockPage/LockPage';

const GroupContentContainer = ({currentUser, token, group, joiningInProgress, join, leave}) => {
    const [member, setIsMember] = useState(checkIsMember(group, currentUser._id));
    const [isRequestedJoin, setIsRequestedJoin] = useState((group.joinRequests.filter(m => m._id === currentUser._id)).length > 0);
    const isBanned = checkIsBanned(group, currentUser._id);
    const navigate = useNavigate();

    const handleJoining = () => {
        if(!member) {
            join(group._id, {_id: currentUser._id, username: currentUser.username, profilePicture: currentUser.profilePicture, email: currentUser.email}, token);
            setIsMember(true);
        }
        else {
            leave(group._id, currentUser._id, token);
            setIsMember(false);
        }
    }

    const handleRequest = () => {
        if(!isRequestedJoin) {
            join(group._id, {_id: currentUser._id, username: currentUser.username, profilePicture: currentUser.profilePicture, email: currentUser.email}, token);
            setIsRequestedJoin(true);
        }
    }

    const handleSettingsNavigation=()=>{
        navigate('./settings');
    }

    return (
        <div className={classes.wrapper}>
            <GroupHeader currentUser={currentUser} group={group} member={member} isBanned={isBanned} navigateSettings={handleSettingsNavigation} handleRequest={handleRequest} handleJoining={handleJoining} joining={joiningInProgress} requested={isRequestedJoin}/>
            {group.policies.isPrivate && !member
                ? <LockPage group={group}/>
                : <GroupContent/>
            }
        </div>
    );
};

export default GroupContentContainer;