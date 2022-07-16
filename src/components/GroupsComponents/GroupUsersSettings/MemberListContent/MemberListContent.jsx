import React from 'react';
import LoaderShell from '../../../MinorComponents/LoaderShell/LoaderShell';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import UserControlCard from '../UserControlCard/UserControlCard';
import classes from './MembersListContent.module.scss'; 

const MemberListContent = ({currentUser, group, results, getResults, resetResults, isFetching, error, page, more, commonMode, banMode, requestMode, handleAccept, handleBan, handlePromote}) => {
    return (
        <LoaderShell getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} elementId={'userList'}>
            <div className={classes.wrapper} id='userList'>
                {isFetching && results.length === 0 ? <Preloader/> 
                : error ? <span className={classes.message}>{error}</span>
                : results.length === 0 ? <span className={classes.message}>No people found</span>
                : <>{results.map(profile => {
                        return <UserControlCard key={profile._id} currentUser={currentUser} profile={profile} group={group} handleBan={handleBan} handleAccept={handleAccept} handlePromote={handlePromote} commonMode={commonMode} banMode={banMode} requestMode={requestMode}/>
                    })}
                    {isFetching && results ? <Preloader/> : ''}
                </>
            }</div>
        </LoaderShell>
    );
};

export default MemberListContent;