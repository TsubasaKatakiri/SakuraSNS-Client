import React, { useEffect } from 'react';
import UserListContent from '../UserListContent/UserListContent';

const UserList = ({currentUser, token, isFetching, error, getResults, resetResults, results, more, page, query, setCommonMode, ...props}) => {
    useEffect(()=>{
        getResults();
        return () => resetResults();
    }, [query]);

    useEffect(()=>{
        setCommonMode(true);
        return () => setCommonMode(false);
    }, [])

    return <UserListContent currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getResults} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation}/>
};

export default UserList;