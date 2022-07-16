import React, { useEffect } from 'react';
import GroupListContent from '../GroupListContent/GroupListContent';

const GroupsList = ({currentUser, token, isFetching, error, getResults, resetResults, results, more, page, query, setCommonMode}) => {
    useEffect(() => {
        getResults();
        return () => resetResults();
    }, [query]);

    useEffect(() => {
        setCommonMode(true);
        return () => setCommonMode(false);
    }, [])

    return <GroupListContent currentUser={currentUser} token={token} isFetching={isFetching} error={error} getResults={getResults} results={results} more={more} page={page} query={query}/>;
};

export default GroupsList;