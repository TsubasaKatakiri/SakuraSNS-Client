import React, { useEffect } from 'react';
import MemberListContent from '../MemberListContent/MemberListContent';

const BanList = ({currentUser, group, query, getResults, resetResults, banMode, setBanMode, results, isFetching, page, more, handleBan}) => {
    useEffect(() => {
        getResults();
        return resetResults();
    }, [query])

    useEffect(() => {
        setBanMode(true);
        return () => setBanMode(false);
    }, [])

    return<MemberListContent currentUser={currentUser} group={group} results={results} getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} banMode={banMode} handleBan={handleBan}/>;
};

export default BanList;