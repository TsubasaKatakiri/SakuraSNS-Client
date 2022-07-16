import React from 'react';
import classes from './VideoBlock.module.scss';
import VideoCommentSystem from './VideoCommentSystem/VideoCommentSystem';
import { Link } from 'react-router-dom';
import avatar from '../../../images/noAvatar.png';
import VideoControlsModule from './VideoControlsModule/VideoControlsModule';
import SimpleButton from '../../MinorComponents/SimpleButton/SimpleButton';

const VideoBlock = ({currentUser, currentVideo, followed, followInProgress, handleFollowControl}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.videoContainer}>
                <video src={currentVideo.videofile} controls className={classes.video}/>
            </div>
            <div className={classes.videoInfo}>
                <VideoControlsModule/>
                <div className={classes.authorBar}>
                    <Link to={`/profile/${currentVideo.uploader._id}`} className={classes.author}>
                        <img src={currentVideo.uploader.profilePicture ? currentVideo.uploader.profilePicture : avatar} alt='' className={classes.authorAvatar}/>
                        <div className={classes.authorInfo}>
                            <span className={classes.authorName}>{currentVideo.uploader.username ? currentVideo.uploader.username : currentVideo.uploader.email}</span>
                            <span className={classes.authorFollowers}>{currentVideo.uploader.followers.length} followers</span>
                        </div>
                    </Link>
                    {currentVideo.uploader._id !== currentUser._id
                    ? <SimpleButton onClick={handleFollowControl}>
                        {followed 
                            ? (followInProgress.some(id => id === currentVideo.uploader._id) ? 'Following...' : 'Unfollow User') 
                            : (followInProgress.some(id => id === currentVideo.uploader._id) ? 'Unfollowing...' : 'Follow User')}
                    </SimpleButton> 
                    : ''}
                </div>
                <div className={classes.description}>
                    <p className={classes.descriptionText}>{currentVideo.description}</p>
                </div>
            </div>
            <div className={classes.commentContainer}>
                <VideoCommentSystem/>
            </div>
        </div>
    );
};

export default VideoBlock;