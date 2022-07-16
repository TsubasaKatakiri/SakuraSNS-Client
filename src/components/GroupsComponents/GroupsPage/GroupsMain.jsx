import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getGroups, getUserGroups, resetGroups, resetGroupsSearchQuery, resetQueryAdvancedParams, setGroupsSearchQuery } from '../../../redux/GroupSearch/GroupSearchActions';
import UserGroupList from './UserGroupList/UserGroupList';
import GroupsHeader from './GroupsHeader/GroupsHeader';
import classes from './GroupsMain.module.scss';
import GroupsList from './GroupsList/GroupsList';
import AdvancedSearchForm from './AdvancedSearchForm/AdvancedSearchForm';

const GroupsMain = ({currentUser, token, getGroups, getUserGroups, resetGroups, query, setQuery, results, page, more, ...props}) => {
    const [commonMode, setCommonMode] = useState(false);
    const [userMode, setUserMode] = useState(false);

    const getAllResults = (pageNumber) => {
        if(pageNumber) getGroups(query, token, pageNumber);
        else getGroups(query, token);
    }

    const getUserResults = (userId, pageNumber) => {
        if(pageNumber) getUserGroups(userId, query, token, pageNumber);
        else getUserGroups(userId, query, token);
    }

    return (
        <div className={classes.wrapper}>
            <GroupsHeader currentUser={currentUser} commonMode={commonMode} userMode={userMode} query={query} setQuery={setQuery} resetResults={resetGroups}/>
            <div className={classes.content}>
                <div className={classes.contentLeft}>
                    <Routes>
                        <Route path='/' element={<GroupsList currentUser={currentUser} token={token} isFetching={props.isFetching} error={props.error} getResults={getAllResults} resetResults={resetGroups} results={results} more={more} page={page} query={query} setCommonMode={setCommonMode}/>}/>
                        <Route path='/user/' element={<Navigate to={`../user/${currentUser._id}`}/>}/>
                        <Route path='/user/:userId' element={<UserGroupList currentUser={currentUser} token={token} isFetching={props.isFetching} error={props.error} getResults={getUserResults} resetResults={resetGroups} results={results} more={more} page={page} query={query} setUserMode={setUserMode}/>}/>
                    </Routes> 
                </div>
                <AdvancedSearchForm isDark={currentUser.userSettings.isDarkMode} searchQuery={query} setQuery={setQuery} reset={resetGroups} resetQueryAdvancedParams={props.resetQueryAdvanced}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        query: state.groupSearch.searchQuery,
        results: state.groupSearch.searchResults,
        totalPages: state.groupSearch.totalResultsPages,
        page: state.groupSearch.resultsPage,
        more: state.groupSearch.moreResults,
        isFetching: state.groupSearch.isFetching,
        error: state.groupSearch.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (searchData, token, page, limit) => {dispatch(getGroups(searchData, token, page, limit))},
        getUserGroups: (userId, searchData, token, page, limit) => {dispatch(getUserGroups(userId, searchData, token, page, limit))},
        resetGroups: () => {dispatch(resetGroups())},
        setQuery: (query) => {dispatch(setGroupsSearchQuery(query))},
        resetQuery: () => {dispatch(resetGroupsSearchQuery())},
        resetQueryAdvanced: () => {dispatch(resetQueryAdvancedParams())},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GroupsMain);