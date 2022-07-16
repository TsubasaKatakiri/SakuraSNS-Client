import React from 'react';
import SimpleButton from '../../MinorComponents/SimpleButton/SimpleButton';
import StatusString from '../StatusString/StatusString';
import classes from './ProfileHeader.module.scss';
import { checkUserPrivacy } from '../../../util/CheckUserPrivacy';
import ProfileShell from '../../MinorComponents/ProfileShell/ProfileShell';

const ProfileHeader = ({userId, currentId, currentUser, token, profile, changeStatus, handleConversationCreation, handleFollowControl, followed, followInProgress}) => {
    return (
        <ProfileShell cover={profile.coverPicture} avatar={profile.profilePicture}>
            <div className={classes.bottomInfo}>
                <h3 className={classes.username}>{profile.username}</h3>
                <StatusString profile={profile} currentUser={currentUser} token={token} changeStatus={changeStatus}/>
                <span className={classes.about}>{profile.description}</span>
            </div>
            {userId !== currentId 
                ?   <div className={classes.bottomFunctions}>
                    {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAcceptMessages)
                        ? <SimpleButton onClick={() => handleConversationCreation(profile._id)}>Write...</SimpleButton>
                        : ''
                    }
                    <SimpleButton onClick={handleFollowControl} disabled={followInProgress.some(id => id === profile._id)}>
                    {followed 
                        ? (followInProgress.some(id => id === profile._id) ? 'Following...' : 'Unfollow User') 
                        : (followInProgress.some(id => id === profile._id) ? 'Unfollowing...' : 'Follow User')
                    }
                    </SimpleButton>
                 </div> 
                : ''
            }
        </ProfileShell>
    );
};

export default ProfileHeader;