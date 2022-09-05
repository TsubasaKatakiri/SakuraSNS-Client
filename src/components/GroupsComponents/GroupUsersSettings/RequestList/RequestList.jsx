import React, { useEffect } from 'react';
import MemberListContent from '../MemberListContent/MemberListContent';

const RequestList = ({currentUser, group, query, getResults, resetResults, requestMode, setRequestMode, results, isFetching, page, more, handleAccept}) => {
    useEffect(() => {
        getResults();
        return resetResults();
    }, [query])

    useEffect(() => {
        setRequestMode(true);
        return () => setRequestMode(false);
    }, [])

    return <MemberListContent currentUser={currentUser} group={group} results={results} getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} requestMode={requestMode} handleAccept={handleAccept}/>;
};

export default RequestList;