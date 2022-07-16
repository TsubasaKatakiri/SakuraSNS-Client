import React from 'react';
import { Link } from 'react-router-dom';
import classes from './DiscussionThumbnail.module.scss';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

const DiscussionThumbnail = ({discussion, group}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`/groups/${discussion.groupId}/discussions/${discussion._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.nameBlock}>
                <h4 className={classes.name}>{discussion.discussionName}</h4>
                {discussion.isPrivate ? <VisibilityOffIcon className={classes.statusIcon}/> : ''}
                {discussion.isClosed ? <LockIcon className={classes.statusIcon}/> : ''}
            </div>
            <div className={classes.infoBlock}>
                <span className={classes.infoString}>{discussion.posts.length} posts</span>
                <span className={classes.infoString}>Author: {discussion.author.username}</span>
                <span className={classes.infoString}>Started: {new Date(discussion.createdAt).toLocaleString('en-US')}</span>
                <span className={classes.infoString}>Last post: {new Date(discussion.lastPost.createdAt).toLocaleString('en-US')}</span>
            </div>
        </Link>
    );
};

export default DiscussionThumbnail;