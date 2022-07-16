import React from 'react';
import FollowersWidget from '../UserProfile/FollowersWidget/FollowersWidget';
import FollowingsWidget from '../UserProfile/FollowingsWidget/FollowingsWidget';
import BirthdayNotificationContainer from './BirthdayNotification/BirthdayNotificationContainer';
import CompleteFeed from './CompleteFeed/CompleteFeed';
import classes from './FeedMain.module.scss';


const FeedMain = ({currentUser}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.feedPanel}>
                <CompleteFeed/>
            </div>
            <div className={classes.infoPanel}>
                <BirthdayNotificationContainer currentUser = {currentUser}/>
                <FollowingsWidget profile = {currentUser}/>
                <FollowersWidget profile = {currentUser}/>
            </div>
        </div>
    );
};

export default FeedMain;