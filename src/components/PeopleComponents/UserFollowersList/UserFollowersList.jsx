import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserListContent from '../UserListContent/UserListContent';

const UserFollowersList = ({currentUser, token, isFetching, error, getResults, resetResults, results, more, page, query, setFollowerMode, ...props}) => {
    const userId = useParams().userId;

    useEffect(()=>{
        getResults(userId);
        return () => resetResults();
    }, [userId, query]);

    useEffect(()=>{
        setFollowerMode(true);
        return () => setFollowerMode(false);
    }, [])

    return <UserListContent currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getResults} results={results} more={more} page={page} query={query} userFriends={props.userFriends} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation}/>
};

export default UserFollowersList;