import React from 'react';
import classes from './DiscussionPost.module.scss';
import AuthorInfo from './../../../../MinorComponents/AuthorInfo/AuthorInfo';
import { Delete } from '@material-ui/icons';

const DiscussionPost = ({currentUser, post, isAllowed, handleDeletePost}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.info}>
                <div className={classes.infoBlock}>
                    <AuthorInfo user={post.author}/>
                    <span className={classes.datetime}>Posted at {new Date(post.createdAt).toLocaleString('en-US')}</span>
                </div>
                <div className={classes.controls}>
                    {isAllowed || post.author._id === currentUser._id
                        ? <Delete className={classes.control} onDoubleClick={() => handleDeletePost(post._id)}/>
                        : ''
                    } 
                </div>
            </div>
            <div className={classes.postText}>
                <p>{post.postText}</p>
            </div>
        </div>
    );
};

export default DiscussionPost;