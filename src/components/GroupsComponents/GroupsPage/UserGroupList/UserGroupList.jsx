import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GroupListContent from '../GroupListContent/GroupListContent';

const UserGroupList = ({currentUser, token, isFetching, error, getResults, resetResults, results, more, page, query, setUserMode}) => {
    const userId = useParams().userId;

    useEffect(() => {
        getResults(userId);
        return () => resetResults();
    }, [query]);

    useEffect(() => {
        setUserMode(true);
        return () => setUserMode(false);
    }, [])

    return <GroupListContent currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getResults} results={results} more={more} page={page} query={query}/>;
};

export default UserGroupList;