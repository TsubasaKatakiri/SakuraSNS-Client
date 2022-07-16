import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupEvents, resetGroupEvents } from '../../../../../redux/GroupContent/GroupContentActions';
import EventWidgetContent from './EventWidgetContent/EventWidgetContent';

const EventsWidget = ({currentUser, token, group, events, isFetching, error, getEvents, resetEvents}) => {
    useEffect(() => {
        getEvents(group._id, token);
        return resetEvents();
    }, []) 

    return <EventWidgetContent group={group} events={events} isFetching={isFetching} error={error}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        events: state.groupContent.events,
        isFetching: state.groupContent.isFetchingEvents,
        error: state.groupContent.errorEvents,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (userId, token) => {dispatch(getGroupEvents(userId, token))},
        resetEvents: () => {dispatch(resetGroupEvents())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsWidget);