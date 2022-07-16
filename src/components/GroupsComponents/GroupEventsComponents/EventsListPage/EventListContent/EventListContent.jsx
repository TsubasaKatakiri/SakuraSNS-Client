import React from 'react';
import classes from './EventListContent.module.scss';
import EventListHeader from './../EventListHeader/EventListHeader';
import Preloader from '../../../../MinorComponents/Preloader/Preloader';
import EventThumbnail from './../../../GroupPage/GroupContent/EventsWidget/EventThumbnail/EventThumbnail';

const EventListContent = ({currentUser, group, events, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={classes.wrapper}>
            <EventListHeader currentUser={currentUser} group={group}/>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                {isFetching || !events ? <Preloader/> 
                    : <>{error 
                        ?   <div className={classes.errorScreen}>
                                <span className={classes.errorText}>{error}</span>
                            </div>
                        :   <div>
                                {events.map(event => {
                                    return <EventThumbnail key={event._id} event={event} group={group}/>
                                })}
                            </div>
                    }
                    </>
                }
            </div>
        </div>
    );
};

export default EventListContent;