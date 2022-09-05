import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEvents, resetEvents } from '../../../../redux/GroupEvents/GroupEventsActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import EventListContent from './EventListContent/EventListContent';

const EventsListPage = ({currentUser, token, group, events, isFetching, error, getEvents, resetEvents}) => {
    const groupId = useParams().groupId;

    useEffect(() => {
        getEvents(groupId, token);
        return resetEvents();
    }, [])

    return (
        <GroupPageContainer>
            <EventListContent currentUser={currentUser} group={group} events={events} isFetching={isFetching} error={error}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        events: state.groupEvents.events,
        isFetching: state.groupEvents.isFetching,
        error: state.groupEvents.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (groupId, token) => {dispatch(getEvents(groupId, token))},
        resetEvents: () => {dispatch(resetEvents())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);