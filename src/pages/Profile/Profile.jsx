import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserProfile from '../../components/UserProfile/UserProfile';
import { followUnfollowProfile } from '../../redux/Auth/AuthActions';
import { createConversation } from '../../redux/Chat/ChatActions';
import { changeStatus, getProfile, resetProfile } from '../../redux/Profile/ProfileActions';
import Preloader from './../../components/MinorComponents/Preloader/Preloader';

const Profile = ({token, getProfile, resetProfile, ...props}) => {
    let userId = useParams().userId;

    useEffect(() => {
        getProfile(userId, token);
        return () => resetProfile();
    }, [getProfile, resetProfile, userId, token])

    if(!props.profile){
        return <Preloader/>
    }

    return (
        <UserProfile currentUser={props.currentUser} token={token} profile={props.profile} followUnfollow={props.followUnfollowProfile} followInProgress={props.followInProgress} changeStatus={props.changeStatus} userFriends={props.userFriends} createConversation={props.createConversation}/>
    )
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        userFriends: state.auth.userFriends,
        followInProgress: state.auth.followInProgress,
        profile: state.profile.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (id, token) => {dispatch(getProfile(id, token))},
        followUnfollowProfile: (userId, currentId, token) => {dispatch(followUnfollowProfile(userId, currentId, token))},
        changeStatus: (id, statusInfo, token) => {dispatch(changeStatus(id, statusInfo, token))},
        resetProfile: () => {dispatch(resetProfile())},
        createConversation: (id, conversation) => {dispatch(createConversation(id, conversation))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);