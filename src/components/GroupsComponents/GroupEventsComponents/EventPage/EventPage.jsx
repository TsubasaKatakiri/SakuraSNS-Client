import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentEvent, updateCurrentEvent, joinCurrentEvent, resetEvent } from '../../../../redux/GroupEvent/GroupEventActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import EventPageContent from './EventPageContent/EventPageContent';
import classes from './EventPage.module.scss';
import { GroupEventAPI } from '../../../../api/GroupEventApi';

const EventPage = ({currentUser, token, userFriends, group, currentEvent, getEvent, resetEvent, joinEvent, ...props}) => {
    const [opened, setOpened] = useState(false);
    const [serviceError, setServiceError] = useState(null);
    const eventId = useParams().eventId;
    const navigate = useNavigate();

    useEffect(() => {
        getEvent(eventId, token);
        return resetEvent();
    }, []);


    const handleOpenModal = () => setOpened(!opened);

    if(opened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const handleDeletion = async () => {
        try {
            await GroupEventAPI.deleteEvent(group._id, currentEvent._id, currentUser._id, token);
            navigate(`../${group._id}`);
        } catch (e) {
            setServiceError('Error while deleting an event')
        }
    }

    const handleJoin = () => {
        joinEvent(group._id, eventId, currentUser._id, token)
    }

    return (
        <GroupPageContainer>
            <EventPageContent group={group} currentUser={currentUser} currentEvent={currentEvent} joinInProgress={props.joinInProgress} handleJoin={handleJoin} userFriends={userFriends} opened={opened} setOpened={setOpened} handleDeletion={handleDeletion} handleOpenModal={handleOpenModal} isFetching={props.isFetching} error={props.error}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        userFriends: state.auth.userFriends,
        group: state.group.group,
        currentEvent: state.groupEvent.currentEvent,
        isFetching: state.groupEvent.isFetching,
        joinInProgress: state.groupEvent.joinInProgress,
        error: state.groupEvent.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvent: (eventId, token) => {dispatch(getCurrentEvent(eventId, token))},
        resetEvent: () =>{dispatch(resetEvent())},
        updateEvent: (groupId, eventId, eventData, token) => {dispatch(updateCurrentEvent(groupId, eventId, eventData, token))},
        joinEvent: (groupId, eventId, userId, token) => {dispatch(joinCurrentEvent(groupId, eventId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);