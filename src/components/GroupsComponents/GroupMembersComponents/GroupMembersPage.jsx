import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followUnfollowProfile } from '../../../redux/Auth/AuthActions';
import { createConversation } from '../../../redux/Chat/ChatActions';
import { getGroupUsers, resetPeople, resetPeopleSearchQuery, resetQueryAdvancedParams, setPeopleSearchQuery } from '../../../redux/People/PeopleActions';
import AdvancedSearchForm from '../../PeopleComponents/AdvancedSearchForm/AdvancedSearchForm';
import UserList from '../../PeopleComponents/UserList/UserList';
import GroupMembersHeader from './GroupMembersHeader/GroupMembersHeader';
import classes from './GroupMembersPage.module.scss';
import GroupPageContainer from './../GroupPageContainer/GroupPageContainer';

const GroupMembersPage = ({currentUser, token, results, totalPages, page, more, isFetching, error, getGroupUsers, resetPeople, query, ...props}) => {
    const groupId = useParams().groupId;
    const [commonMode, setCommonMode] = useState();

    const getResults = (pageNumber) => {
        if(pageNumber) getGroupUsers(groupId, query, token, pageNumber)
        else getGroupUsers(groupId, query, token)
    }

    return (
        <GroupPageContainer>
            <div className={classes.wrapper}>
                <GroupMembersHeader groupId={groupId} query={query} setQuery={props.setQuery} resetPeople={resetPeople}/>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <UserList currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getResults} resetResults={resetPeople} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation} setCommonMode={setCommonMode}/>
                    </div>
                    <AdvancedSearchForm searchQuery={query} setSearchQuery={props.setQuery} resetPeople={resetPeople} resetQueryAdvancedParams={props.resetQueryAdvancedParams}/>
                </div>
            </div>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        userFriends: state.auth.userFriends,
        token: state.auth.token,
        followInProgress: state.auth.followInProgress,
        query: state.people.searchQuery,
        results: state.people.searchResults,
        totalPages: state.people.totalResultsPages,
        page: state.people.resultsPage,
        more: state.people.moreResults,
        isFetching: state.people.isFetching,
        error: state.people.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupUsers: (groupId, searchData, token, page, limit) => {dispatch(getGroupUsers(groupId, searchData, token, page, limit))},
        resetPeople: () => {dispatch(resetPeople())},
        setQuery: (query) => {dispatch(setPeopleSearchQuery(query))},
        resetQuery: () => {dispatch(resetPeopleSearchQuery())},
        resetQueryAdvancedParams: () => {dispatch(resetQueryAdvancedParams())},
        followUnfollowProfile: (userId, currentId, token) => {dispatch(followUnfollowProfile(userId, currentId, token))},
        createConversation: (id, conversation) => {dispatch(createConversation(id, conversation))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembersPage);