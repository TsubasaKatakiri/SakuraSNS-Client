import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import AuthorInfo from '../../../MinorComponents/AuthorInfo/AuthorInfo';
import SimpleLikeDislikeControls from '../../../MinorComponents/SimpleLikeDislikeControls/SimpleLikeDislikeControls';
import PostBody from '../PostBody/PostBody';
import classes from './PostComponent.module.scss';

const PostContent = ({currentUser, post, group, likeMethod, dislikeMethod, sliderContent, audioContent}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.header}>
                <AuthorInfo user={post.user}/>
                <TimeAgo datetime={post.createdAt} locale='en_US' live={true} className={classes.headerTime}/>
            </div>
            <PostBody post={post} sliderContent={sliderContent} audioContent={audioContent}/>
            <div className={classes.footer}>
                {post.tags.length > 0 ? <div className={classes.tagLine}>
                    {post.tags.map((tag, i)=>{
                        return <span className={classes.tag} key={i}>{tag}</span>
                    })}
                </div> : ''}
                <div className={classes.footerControls}>
                    <SimpleLikeDislikeControls currentUser={currentUser} likes={post.likes} dislikes={post.dislikes} likeMethod={likeMethod} dislikeMethod={dislikeMethod}/>
                    <Link to={`./post/${post._id}`} className={classes.commentInfo}>
                        {post.comments.length === 1 ? '1 comment'
                        : `${post.comments.length} comments`
                        }
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostContent;