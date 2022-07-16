import React, { useState } from 'react';
import { checkIsBanned, checkIsMember, checkPolicy, checkUserLevel } from '../../../../util/CheckPolicy';
import classes from './UserControlCard.module.scss';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';
import UserPromotionForm from './../UserPromotionForm/UserPromotionForm';
import avatar from '../../../../images/noAvatar.png';

const UserControlCard = ({currentUser, profile, group, handleBan, handleAccept, handlePromote, commonMode = false, banMode = false, requestMode = false}) => {
    const level = checkUserLevel(group, profile._id);
    const [banned, setBanned] = useState(checkIsBanned(group, profile._id))
    const isAllowedBan = checkPolicy(group, currentUser._id, group.policies.canBanUsers);
    const isAllowedRequestProcess = checkPolicy(group, currentUser._id, group.policies.canAcceptJoinRequests);
    const isDark = document.body.classList.contains('dark');

    const handleBlockRequest = () => {
        setBanned(true);
        const banData = {userId: currentUser._id, banUserId: profile._id};
        handleBan(banData);
    }

    const handleUnblockRequest = () => {
        const banData = {userId: currentUser._id, banUserId: profile._id};
        handleBan(banData);
    }

    const handleAcceptRequest = () => {
        const acceptData = {userId: currentUser._id, acceptingUserId: profile._id, isAllowed: true};
        handleAccept(acceptData);
    }

    const handleRefuseRequest = () => {
        const acceptData = {userId: currentUser._id, acceptingUserId: profile._id, isAllowed: false};
        handleAccept(acceptData);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.userInfo}>
                <img src={profile.profilePicture ? profile.profilePicture : avatar} alt='' className={classes.avatar}/>
                <div className={classes.stringsContainer}>
                    <span className={classes.username}>{profile.username}</span>
                    {checkIsMember(group, profile._id) ? <span className={classes.role}>{level}</span> : ''} 
                </div>
            </div>
            <div className={classes.userFunctions}>
                {level === 'creator' || currentUser._id === profile._id
                ? ''
                : <>{commonMode ?
                        <div className={classes.functions}>
                            <UserPromotionForm currentUser={currentUser} group={group} userLevel={level} levelUserId={profile._id} handlePromote={handlePromote}/>
                            <SimpleButton type='button' disabled={!isAllowedBan || banned} onClick={handleBlockRequest}>Block user</SimpleButton>
                        </div> : ''}
                    {banMode ?
                        <div className={classes.functions}>
                            <SimpleButton type='button' disabled={!isAllowedBan} onClick={handleUnblockRequest}>Unblock user</SimpleButton>
                        </div> : ''}
                    {requestMode ?
                        <div className={classes.functions}>
                            <SimpleButton type='button' disabled={!isAllowedRequestProcess} onClick={handleAcceptRequest}>Accept</SimpleButton>
                            <SimpleButton type='button' disabled={!isAllowedRequestProcess} onClick={handleRefuseRequest}>Refuse</SimpleButton>
                        </div> : ''}
                </>
                }
                
            </div>
        </div>
    );
};

export default UserControlCard;