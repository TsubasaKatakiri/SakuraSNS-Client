import React, { useEffect } from 'react';
import { getGroup, join, leave, resetGroup } from '../../../redux/Group/GroupActions';
import { connect } from 'react-redux';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import { useParams } from 'react-router-dom';
import GroupContentContainer from './GroupContentContainer/GroupContentContainer';

const GroupPage = ({currentUser, token, group, getGroup, resetGroup,...props}) => {
    let groupId = useParams().groupId;

    useEffect(()=>{
        getGroup(groupId, token);
        return () => resetGroup();
    }, [getGroup, resetGroup, groupId, token]);

    if(!group) return <Preloader/>;

    return <GroupContentContainer currentUser={currentUser} token={token} group={group} joiningInProgress={props.joiningInProgress} join={props.join} leave={props.leave}/>
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        isFetching: state.group.isFetching,
        error: state.group.error,
        joiningInProgress: state.group.joiningInProgress,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroup: (groupId, token) => {dispatch(getGroup(groupId, token))},
        join: (groupId, userData, token) => {dispatch(join(groupId, userData, token))},
        leave: (groupId, userId, token) => {dispatch(leave(groupId, userId, token))},
        resetGroup: () =>{dispatch(resetGroup())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);