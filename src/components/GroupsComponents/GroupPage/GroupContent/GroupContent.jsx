import React from 'react';
import classes from './GroupContent.module.scss';
import GroupFeed from './GroupFeed/GroupFeed';
import AlbumsWidget from './AlbumsWidget/AlbumsWidget';
import VideoWidget from './VideoWidget/VideoWidget';
import MusicWidget from './MusicWidget/MusicWidget';
import MembersWidget from './MembersWidget/MembersWidget';
import EventsWidget from './EventsWidget/EventsWidget';
import AboutWidget from './AboutWidget/AboutWidget';
import DiscussionsWidget from './DiscussionsWidget/DiscussionsWidget';

const GroupContent = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bottomPrimary}>
                <AboutWidget/>
                <DiscussionsWidget/>
                <MusicWidget/>
                <GroupFeed/>
            </div>
            <div className={classes.bottomSecondary}>
                <EventsWidget/>
                <VideoWidget/>
                <AlbumsWidget/>
                <MembersWidget/>
            </div>
        </div>  
    );
};

export default GroupContent;