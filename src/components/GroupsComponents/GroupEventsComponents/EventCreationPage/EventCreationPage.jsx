import { ChevronLeft, Create } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GroupEventAPI } from '../../../../api/GroupEventApi';
import EventForm from '../EventForm/EventForm';
import GroupPageContainer from './../../GroupPageContainer/GroupPageContainer';
import classes from './EventCreationPage.module.scss';

const EventCreationPage = ({currentUser, token, group}) => {
    const isDark = document.body.classList.contains('dark');
    const groupId = useParams().groupId;
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const createMethod = async (eventData) => {
        try{
            setError(null);
            const res = await GroupEventAPI.createEvent(group._id, eventData, token);
            navigate(`/groups/${groupId}/event/${res.event._id}`);
        }catch(e){
            setError('Error while creating an event');
        }
    }

    return (
        <GroupPageContainer>
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.logo}>
                            <Create className={classes.logoIcon}/>
                            <h3 className={classes.logoText}>Create new event</h3>
                        </div>
                        <div className={classes.controlGroup}>
                            <Link to={`/groups/${groupId}/event`} className={classes.control}>
                                <ChevronLeft className={classes.controlIcon}/>
                                <span className={classes.controlCaption}>To event list</span>
                            </Link>
                            <Link to={`/groups/${groupId}`} className={classes.control}>
                                <ChevronLeft className={classes.controlIcon}/>
                                <span className={classes.controlCaption}>To group</span>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.main}>
                        {error ? <span className={classes.message}>{error}</span> : ''}
                        <EventForm currentUser={currentUser} group={group} createMethod={createMethod}/>
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
    }
}

export default connect(mapStateToProps)(EventCreationPage);