import React from 'react';
import Paginator from '../../../../MinorComponents/Paginator/Paginator';
import Preloader from '../../../../MinorComponents/Preloader/Preloader';
import classes from  './DiscussionPostListContent.module.scss';
import DiscussionPost from './../DiscussionPost/DiscussionPost';
import PostCreationForm from '../PostCreationForm/PostCreationForm';

const DiscussionPostListContent = ({currentUser, posts, isAllowed, isLocked, isFetching, error, page, totalPages, onPageChanged, handleAddPost, handleDeletePost}) => {
    const isDark = document.body.classList.contains('dark');
    
    return (
        <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
            <Paginator page={page} totalPages={totalPages} onPageChanged={onPageChanged}/>
                {((!posts && !error) || (isFetching && !posts)) ? <Preloader/> 
                : error ? <span className={classes.message}>{error}</span>
                : posts.length === 0 ? <span className={classes.message}>No posts</span>
                : <>{posts.map(post => {
                        return <DiscussionPost key={post._id} currentUser={currentUser} post={post} isAllowed={isAllowed} handleDeletePost={handleDeletePost}/>
                    })}</>
                }
            <Paginator page={page} totalPages={totalPages} onPageChanged={onPageChanged}/>
            <div className={classes.formWrapper}>
                {!isLocked
                    ? <PostCreationForm currentUser={currentUser} handleAdd={handleAddPost}/>
                    : ''
                }
            </div>
        </div>
    );
};

export default DiscussionPostListContent;