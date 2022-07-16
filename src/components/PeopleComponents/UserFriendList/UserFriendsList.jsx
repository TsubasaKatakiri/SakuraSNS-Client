import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserListContent from '../UserListContent/UserListContent';

const UserFriendsList = ({currentUser, token, isFetching, error, getResults, resetResults, results, more, page, query, setFriendMode, ...props}) => {
    const userId = useParams().userId;

    useEffect(()=>{
        getResults(userId);
        return () => resetResults();
    }, [userId, query]);

    useEffect(()=>{
        setFriendMode(true);
        return () => setFriendMode(false);
    }, [])

    return <UserListContent currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getResults} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation}/>
};

export default UserFriendsList;