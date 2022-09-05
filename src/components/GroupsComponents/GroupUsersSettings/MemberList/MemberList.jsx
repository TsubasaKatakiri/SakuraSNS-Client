import React, { useEffect } from 'react';
import MemberListContent from '../MemberListContent/MemberListContent';

const MemberList = ({currentUser, group, query, getResults, resetResults, commonMode, setCommonMode, results, isFetching, page, more, handleBan, handlePromote}) => {
    useEffect(() => {
        getResults();
        return resetResults();
    }, [query])

    useEffect(() => {
        setCommonMode(true);
        return () => setCommonMode(false);
    }, [])

    return <MemberListContent currentUser={currentUser} group={group} results={results} getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} commonMode={commonMode} handleBan={handleBan} handlePromote={handlePromote}/>;
};

export default MemberList;