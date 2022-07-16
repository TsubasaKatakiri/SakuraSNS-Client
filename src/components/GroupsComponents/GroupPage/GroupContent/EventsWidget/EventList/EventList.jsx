import React from 'react';
import EventThumbnail from '../EventThumbnail/EventThumbnail';

const EventList = ({events, group}) => {
    const eventList = events.length > 5 ? events.slice(0, 5) : events;

    return (
        <>{eventList.map(event => {
            return <EventThumbnail key={event._id} event={event} group={group}/> 
        })}</>
    );
};

export default EventList;