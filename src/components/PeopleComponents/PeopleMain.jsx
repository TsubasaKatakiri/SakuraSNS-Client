import React, { useState } from 'react';
import classes from './PeopleMain.module.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getFollowers, getFriends, getPeople, resetPeople, resetPeopleSearchQuery, resetQueryAdvancedParams, setPeopleSearchQuery } from '../../redux/People/PeopleActions';
import { connect } from 'react-redux';
import AdvancedSearchForm from './AdvancedSearchForm/AdvancedSearchForm';
import { followUnfollowProfile } from '../../redux/Auth/AuthActions';
import { createConversation } from '../../redux/Chat/ChatActions';
import UserList from './UserList/UserList';
import UserFriendsList from './UserFriendList/UserFriendsList';
import UserFollowersList from './UserFollowersList/UserFollowersList';
import PeopleHeader from './PeopleHeader/PeopleHeader';

const PeopleMain = ({currentUser, token, results, totalPages, page, more, isFetching, error, getPeople, getFriends, getFollowers, resetPeople, query, ...props}) => {
    const [commonMode, setCommonMode] = useState(false);
    const [friendMode, setFriendMode] = useState(false);
    const [followerMode, setFollowerMode] = useState(false);

    const getAllResults = (pageNumber) => {
        if(pageNumber) getPeople(query, token, pageNumber);
        else getPeople(query, token);
    }

    const getFriendResults = (userId, pageNumber) => {
        if(pageNumber) getFriends(userId, query, token, pageNumber);
        else getFriends(userId, query, token);
    }

    const getFollowersResults = (userId, pageNumber) => {
        if(pageNumber) getFollowers(userId, query, token, pageNumber);
        else getFollowers(userId, query, token);
    }

    return (
        <div className={classes.wrapper}>
            <PeopleHeader currentUser={currentUser} commonMode={commonMode} friendMode={friendMode} followerMode={followerMode} query={query} setQuery={props.setQuery} resetPeople={resetPeople}/>
            <div className={classes.content}>
                <div className={classes.contentLeft}>
                    <Routes>
                        <Route path='/' element={ <UserList currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getAllResults} resetResults={resetPeople} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation} setCommonMode={setCommonMode}/>}/>
                        <Route path='/:userId' element={<Navigate to={`../${currentUser._id}/friends`}/>}/>
                        <Route path='/:userId/friends' element={<UserFriendsList currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getFriendResults} resetResults={resetPeople} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation} setFriendMode={setFriendMode}/>}/>
                        <Route path='/:userId/followers' element={<UserFollowersList currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getFollowersResults} resetResults={resetPeople} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation} setFollowerMode={setFollowerMode}/>}/>
                    </Routes>
                </div>
                <AdvancedSearchForm isDark={currentUser.userSettings.isDarkMode} searchQuery={query} setSearchQuery={props.setQuery} resetPeople={resetPeople} resetQueryAdvancedParams={props.resetQueryAdvancedParams}/>
            </div>
        </div>
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
        getPeople: (searchData, token, page, limit) => {dispatch(getPeople(searchData, token, page, limit))},
        getFriends: (userId, searchData, token, limit, page) => {dispatch(getFriends(userId, searchData, token, limit, page))},
        getFollowers: (userId, searchData, token, limit, page) => {dispatch(getFollowers(userId, searchData, token, limit, page))},
        resetPeople: () => {dispatch(resetPeople())},
        setQuery: (query) => {dispatch(setPeopleSearchQuery(query))},
        resetQuery: () => {dispatch(resetPeopleSearchQuery())},
        resetQueryAdvancedParams: () => {dispatch(resetQueryAdvancedParams())},
        followUnfollowProfile: (userId, currentId, token) => {dispatch(followUnfollowProfile(userId, currentId, token))},
        createConversation: (id, conversation) => {dispatch(createConversation(id, conversation))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleMain);