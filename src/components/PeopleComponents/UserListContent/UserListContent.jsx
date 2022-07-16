import React from 'react';
import LoaderShell from '../../MinorComponents/LoaderShell/LoaderShell';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import ProfileCard from '../ProfileCard/ProfileCard';
import classes from './UserListContent.module.scss';

const UserListContent = ({currentUser, token, isFetching, error, getResults, resetResults, results, more, page, query, setCommonMode, ...props}) => {
    return (
        <LoaderShell getResults={getResults} resetResults={resetResults} isFetching={isFetching} page={page} more={more} elementId={'list'}>
            <div className={classes.wrapper} id='list'>
                {isFetching && results.length === 0 ? <Preloader/> 
                : error ? <span className={classes.message}>{error}</span>
                : results.length === 0 ? <span className={classes.message}>No people found</span>
                : <>{results.map(profile => {
                        return <ProfileCard key={profile._id} profile={profile} userFriends={props.userFriends} currentUser={currentUser} token={token} followInProgress={props.followInProgress} followUnfollow={props.followUnfollow} createConversation={props.createConversation}/>
                    })}
                    {isFetching && results ? <Preloader/> : ''}
                </>
            }</div>
        </LoaderShell>
    );
};

export default UserListContent;