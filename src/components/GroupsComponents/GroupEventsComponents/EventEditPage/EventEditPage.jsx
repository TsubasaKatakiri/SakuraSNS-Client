import React, { useEffect } from 'react';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import classes from './EventEditPage.module.scss';
import { ChevronLeft, Edit } from '@material-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCurrentEvent, resetEvent, updateCurrentEvent } from '../../../../redux/GroupEvent/GroupEventActions';
import { connect } from 'react-redux';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import EventForm from '../EventForm/EventForm';

const EventEditPage = ({currentUser, token, group, currentEvent, isFetching, error, getEvent, resetEvent, updateEvent}) => {
    const isDark = document.body.classList.contains('dark');
    let groupId = useParams().groupId;
    let eventId = useParams().eventId;
    const navigate = useNavigate();

    useEffect(() => {
        getEvent(eventId, token);
        return resetEvent();
    }, []);

    const updateMethod = async (eventData) => {
        updateEvent(group._id, currentEvent._id, eventData, token);
        navigate(`/groups/${groupId}/event/${eventId}`);
    }

    return (
        <GroupPageContainer>
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.logo}>
                            <Edit className={classes.logoIcon}/>
                            <h3 className={classes.logoText}>Edit event</h3>
                        </div>
                        <div className={classes.controlGroup}>
                            <Link to={`/groups/${groupId}/event/${eventId}`} className={classes.control}>
                                <ChevronLeft className={classes.controlIcon}/>
                                <span className={classes.controlCaption}>To event</span>
                            </Link>
                            <Link to={`/groups/${groupId}`} className={classes.control}>
                                <ChevronLeft className={classes.controlIcon}/>
                                <span className={classes.controlCaption}>To group</span>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.main}>
                        {!currentEvent || isFetching
                        ? <Preloader/>
                        : <>{error && !currentEvent 
                                ? <span className={classes.message}>{error}</span>
                                : <EventForm currentUser={currentUser} group={group} currentEvent={currentEvent} updateMethod={updateMethod}/>
                            }
                        </>
                        }
                    </div>
                </div>
            </div>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        currentEvent: state.groupEvent.currentEvent,
        isFetching: state.groupEvent.isFetching,
        error: state.groupEvent.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvent: (eventId, token) => {dispatch(getCurrentEvent(eventId, token))},
        resetEvent: () =>{dispatch(resetEvent())},
        updateEvent: (groupId, eventId, eventData, token) => {dispatch(updateCurrentEvent(groupId, eventId, eventData, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditPage);