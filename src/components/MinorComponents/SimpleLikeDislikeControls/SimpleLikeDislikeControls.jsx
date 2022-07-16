import React, { useState } from 'react';
import classes from './SimpleLikeDislikeControls.module.scss';
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@material-ui/icons';

const SimpleLikeDislikeControls = ({currentUser, likes, dislikes, likeMethod, dislikeMethod}) => {
    const [isLiked, setIsLiked] = useState(likes.includes(currentUser._id));
    const [isDisliked, setIsDisliked] = useState(dislikes.includes(currentUser._id));
    const isDark = document.body.classList.contains('dark');

    const likeHandler = () => {
        setIsLiked(!isLiked);
        if(isDisliked) setIsDisliked(!isDisliked);
        likeMethod(currentUser._id);
    }

    const dislikeHandler = () => {
        setIsDisliked(!isDisliked);
        if(isLiked) setIsLiked(!isLiked);
        dislikeMethod(currentUser._id);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.like} onClick={likeHandler}>
                {isLiked ? <ThumbUp/> : <ThumbUpOutlined/>}
                <span className={classes.likeCount}>{likes.length}</span>
            </div>
            <div className={classes.dislike} onClick={dislikeHandler}>
                {isDisliked ? <ThumbDown/> : <ThumbDownOutlined/>}
                <span className={classes.dislikeCount}>{dislikes.length}</span>
            </div>
        </div>
    );
};

export default SimpleLikeDislikeControls;