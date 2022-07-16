import React, { useState } from 'react';
import VideoBlock from './VideoBlock';

const VideoBlockContainer = ({currentVideo, currentUser, token, userFriends, followUnfollow, followInProgress}) => {
    const [followed, setFollowed] = useState(userFriends.includes(currentVideo.uploader._id));

    const handleFollowControl = async () => {
        followUnfollow(currentVideo.uploader._id, currentUser._id, token);
        setFollowed(!followed);
    }

    return <VideoBlock currentUser={currentUser} currentVideo={currentVideo} followed={followed} followInProgress={followInProgress} handleFollowControl={handleFollowControl}/>
};

export default VideoBlockContainer;