import React, { useState } from 'react';
import { getBans, getMembers, getRequests, resetMembers, resetMembersSearchQuery, setMembersSearchQuery } from '../../../redux/GroupMembers/GroupMembersActions';
import { groupBlock, groupPromote, joinRequestProcess } from '../../../redux/Group/GroupActions';
import GroupPageContainer from './../GroupPageContainer/GroupPageContainer';
import GroupUserHeader from './GroupUserHeader/GroupUserHeader';
import classes from './GroupUsersSettings.module.scss';
import { Route, Routes, useParams } from 'react-router-dom';
import MemberList from './MemberList/MemberList';
import BanList from './BanList/BanList';
import RequestList from './RequestList/RequestList';
import { connect } from 'react-redux';

const GroupUsersSettings = ({currentUser, token, group, results, getMembers, getBans, getRequests, resetMembers, query, isFetching, page, more, ...props}) => {
    const [commonMode, setCommonMode] = useState(false);
    const [banMode, setBanMode] = useState(false);
    const [requestMode, setRequestMode] = useState(false);
    const isDark = document.body.classList.contains('dark');
    const groupId = useParams().groupId;

    const getAllResults = (pageNumber) => {
        if(pageNumber) getMembers(groupId, query, token, pageNumber);
        else getMembers(groupId, query, token);
    }

    const getBansResults = (pageNumber) => {
        if(pageNumber) getBans(groupId, query, token, pageNumber);
        else getBans(groupId, query, token);
    }

    const getRequestsResults = (pageNumber) => {
        if(pageNumber) getRequests(groupId, query, token, pageNumber);
        else getRequests(groupId, query, token);
    }

    const handleBan = (banData) => {
        props.groupBlock(groupId, banData, token)
    }

    const handleAccept = (acceptData) => {
        props.groupRequest(groupId, acceptData, token)
    }

    const handlePromote = (promoteData) => {
        props.groupPromote(groupId, promoteData, token)
    }

    return (
        <GroupPageContainer>
            <div className={classes.wrapper}>
                <GroupUserHeader group={group} commonMode={commonMode} banMode={banMode} requestMode={requestMode} query={query} setQuery={props.setQuery} resetPeople={resetMembers}/>
                <div className={classes.content}>
                    <Routes>
                        <Route path='/' element={ <MemberList currentUser={currentUser} group={group} query={query} getResults={getAllResults} resetResults={resetMembers} results={results} isFetching={isFetching} page={page} more={more} commonMode={commonMode} setCommonMode={setCommonMode} handleBan={handleBan} handlePromote={handlePromote}/> }/>
                        <Route path='/bans' element={<BanList currentUser={currentUser} group={group} query={query} getResults={getBansResults} resetResults={resetMembers} results={results} isFetching={isFetching} page={page} more={more} banMode={banMode} setBanMode={setBanMode} handleBan={handleBan}/> }/>
                        <Route path='/requests' element={<RequestList currentUser={currentUser} group={group} query={query} getResults={getRequestsResults} resetResults={resetMembers} results={results} isFetching={isFetching} page={page} more={more} requestMode={requestMode} setRequestMode={setRequestMode} handleAccept={handleAccept}/> }/>
                    </Routes>
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
        query: state.groupMembers.searchQuery,
        results: state.groupMembers.searchResults,
        totalPages: state.groupMembers.totalResultsPages,
        page: state.groupMembers.resultsPage,
        more: state.groupMembers.moreResults,
        isFetching: state.groupMembers.isFetching,
        error: state.groupMembers.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMembers: (groupId, query, token, page) => {dispatch(getMembers(groupId, query, token, page))},
        getBans: (groupId, query, token, page) => {dispatch(getBans(groupId, query, token, page))},
        getRequests: (groupId, query, token, page) => {dispatch(getRequests(groupId, query, token, page))},
        resetMembers: () => {dispatch(resetMembers())},
        setQuery: (query) => {dispatch(setMembersSearchQuery(query))},
        resetQuery: () => {dispatch(resetMembersSearchQuery())},
        groupPromote: (groupId, levelData, token) => {dispatch(groupPromote(groupId, levelData, token))},
        groupBlock: (groupId, banData, token) => {dispatch(groupBlock(groupId, banData, token))},
        groupRequest: (groupId, requestData, token) => {dispatch(joinRequestProcess(groupId, requestData, token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersSettings);