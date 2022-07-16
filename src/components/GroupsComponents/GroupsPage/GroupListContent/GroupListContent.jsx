import React from 'react';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import GroupCard from '../GroupCard/GroupCard';
import classes from './GroupListContent.module.scss';
import LoaderShell from './../../../MinorComponents/LoaderShell/LoaderShell';

const GroupListContent = ({currentUser, token, isFetching, error, getResults, results, more, page, query}) => {
    const isDark = currentUser.userSettings.isDarkMode;

    return (
        <LoaderShell getResults={getResults} isFetching={isFetching} page={page} more={more} elementId={'list'}>
            <div className={classes.wrapper} id='list'>
                {isFetching && results.length === 0 ? <Preloader/> 
                    : error ? <span className={classes.message}>{error}</span>
                    : results.length === 0 ? <span className={classes.message}>No people found</span>
                    : <>{results.map(group => {
                            return <GroupCard key={group._id} group={group} isDark={isDark}/>
                        })}
                        {isFetching && results ? <Preloader/> : ''}
                    </>
                }
            </div>
        </LoaderShell>
    );
};

export default GroupListContent;