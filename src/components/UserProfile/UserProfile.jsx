import React, { useState } from 'react';
import classes from './UserProfile.module.scss';
import ProfileFeed from '../Feed/ProfileFeed/ProfileFeed';
import { ConversationAPI } from '../../api/ConversationApi';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { checkUserPrivacy } from '../../util/CheckUserPrivacy';
import LockPage from '../MinorComponents/LockPage/LockPage';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import FollowersWidget from './FollowersWidget/FollowersWidget';
import FollowingsWidget from './FollowingsWidget/FollowingsWidget';
import VideoWidget from './VideoWidget/VideoWidget';
import AlbumsWidget from './AlbumsWidget/AlbumsWidget';
import GroupWidget from './GroupWidget/GroupWidget';
import AboutWidget from './AboutWidget/AboutWidget';
import MusicWidget from './MusicWidget/MusicWidget';

const UserProfile = ({currentUser, token, profile, followUnfollow, followInProgress, changeStatus, userFriends, createConversation}) => {
    const currentId = currentUser._id;
    const userId = profile._id;

    const [followed, setFollowed] = useState(userFriends.includes(profile._id));
    const navigate = useNavigate();

    const handleFollowControl = async () => {
        followUnfollow(userId, currentId, token);
        setFollowed(!followed);
    }

    const handleConversationCreation = async (userId) => {
        const res = await ConversationAPI.create({senderId: currentUser._id, receiverId: userId}, token);
        createConversation(currentUser._id, res);
        navigate(`/chat/${res.conversation._id}`);
    }

    return (
        <div className={classes.wrapper}>
            <ProfileHeader userId={userId} currentId={currentId} currentUser={currentUser} token={token} profile={profile} changeStatus={changeStatus} handleConversationCreation={handleConversationCreation} handleFollowControl={handleFollowControl} followed={followed} followInProgress={followInProgress}/>
            <div className={classes.profileBottom}>
                {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessPage)
                    ? <div className={classes.bottomContent}>
                        <div className={classes.bottomSecondary}>
                            {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessFollowings) ? <FollowingsWidget profile={profile}/> : ''}
                            {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessFollowers) ? <FollowersWidget profile={profile}/> : ''}
                            {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessVideos) ? <VideoWidget/> : ''}
                            {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessAlbums) ? <AlbumsWidget/> : ''}
                            {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessGroups) ? <GroupWidget profile={profile}/> : ''}
                        </div>
                        <div className={classes.bottomPrimary}>
                            <AboutWidget profile={profile}/>
                            {checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessMusic) ? <MusicWidget/> : ''}
                            <Routes>
                                <Route path='/' element={<ProfileFeed/>}/>
                                <Route path='/post' element={<ProfileFeed/>}/>
                                <Route path='/post/:postId' element={<ProfileFeed/>}/>
                            </Routes>
                        </div>
                    </div>
                    : <LockPage/>
                }
            </div>
        </div>
    );
};

export default UserProfile;
