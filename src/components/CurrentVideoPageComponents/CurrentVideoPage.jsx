import React from 'react';
import classes from './CurrentVideoPage.module.scss';
import VideoBlockContainer from './VideoBlock/VideoBlockContainer';
import VideoRibbonContainer from './VideoRibbon/VideoRibbonContainer';
import CurrentVideoHeader from './CurrentVideoHeader/CurrentVideoHeader';

const CurrentVideoPage = ({currentUser, token, group, currentVideo, userFriends, followUnfollow, followInProgress, searchQuery, setQueryMethod}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <CurrentVideoHeader isDark={isDark} query={searchQuery} setQueryMethod={setQueryMethod} group={group}/>
            <div className={classes.main}>
                <div className={classes.leftColumn}>
                    <VideoBlockContainer currentUser={currentUser} token={token} currentVideo={currentVideo} userFriends={userFriends} followUnfollow={followUnfollow} followInProgress={followInProgress}/>
                </div>
                <div className={classes.rightColumn}>
                    <VideoRibbonContainer/>
                </div>
            </div>
        </div>
    );
};

export default CurrentVideoPage;