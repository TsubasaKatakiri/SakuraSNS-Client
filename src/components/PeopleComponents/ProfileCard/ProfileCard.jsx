import React, { useState } from 'react';
import classes from './ProfileCard.module.scss';
import avatar from '../../../images/noAvatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { ConversationAPI } from '../../../api/ConversationApi';
import SimpleButton from './../../MinorComponents/SimpleButton/SimpleButton';

const ProfileCard = ({profile, userFriends, currentUser, token, followInProgress, followUnfollow, createConversation}) => {
    const [followed, setFollowed] = useState(userFriends.includes(profile._id));
    const navigate = useNavigate();
    const isDark = document.body.classList.contains('dark');

    const handleFollowControl = async () => {
        followUnfollow(profile._id, currentUser._id, token);
        setFollowed(!followed);
    }

    const handleConversationCreation = async (userId) => {
        const res = await ConversationAPI.create({senderId: currentUser._id, receiverId: userId}, token);
        createConversation(currentUser._id, res);
        navigate(`/chat/${res.conversation._id}`);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.avatarContainer}>
                <img src={profile.profilePicture ? profile.profilePicture : avatar} alt='' className={classes.avatar}/>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.profileInfo}>
                    <Link to={`/profile/${profile._id}`} className={classes.username}>{profile.username}</Link>
                    <span className={classes.status}>{profile.status}</span>
                    <span className={classes.infoString}>Age: {profile.age}</span>
                    <div className={classes.profileLocation}>
                        <span className={classes.infoString}>{profile.extraData.city},</span>
                        <span className={classes.infoString}>{profile.extraData.country}</span>
                    </div>
                    <p className={classes.infoString}>{profile.description}</p>
                </div>
                {currentUser._id !== profile._id ?
                    <div className={classes.controls}>
                        <SimpleButton onClick={handleFollowControl} disabled={followInProgress.some(id => id === profile._id)}>
                            {followed 
                                ? (followInProgress.some(id => id === profile._id) ? 'Following...' : 'Unfollow User') 
                                : (followInProgress.some(id => id === profile._id) ? 'Unfollowing...' : 'Follow User')
                            }
                        </SimpleButton>
                        <SimpleButton onClick={() => handleConversationCreation(profile._id)}>Write...</SimpleButton>
                    </div>
                    : ''
                }
            </div>
        </div>
    );
};

export default ProfileCard;