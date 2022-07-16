import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupUsers, resetPeople } from '../../../../../redux/People/PeopleActions';
import MembersShell from '../../../../UserProfile/FollowingsWidget/MembersShell/MembersShell';

const MembersWidget = ({group, token, query, results, isFetching, error, getGroupUsers, resetPeople, onlineUsers}) => {
    useEffect(() => {
        getGroupUsers(group._id, query, token);
        return () => resetPeople();
    }, [])

    return <MembersShell group={group} users={results} onlineUsers={onlineUsers} isFetching={isFetching} error={error}/>
};

const mapStateToProps = (state) => {
    return{
        onlineUsers: state.auth.onlineUsers,
        group: state.group.group,
        token: state.auth.token,
        query: state.people.searchQuery,
        results: state.people.searchResults,
        isFetching: state.people.isFetching,
        error: state.people.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupUsers: (groupId, searchData, token, page, limit) => {dispatch(getGroupUsers(groupId, searchData, token, page, limit))},
        resetPeople: () => {dispatch(resetPeople())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersWidget);