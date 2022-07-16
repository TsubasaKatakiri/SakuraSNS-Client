import React from 'react';
import classes from './LikeDislikeControls.module.css';
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@material-ui/icons';

const LikeDislikeControls = ({likeHandler, isLiked, likes, dislikeHandler, isDisliked, dislikes}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.likeInfo} onClick={likeHandler}>
                {isLiked ? <ThumbUp/> : <ThumbUpOutlined/>}
                <span className={classes.likesCount}>{likes}</span>
            </div>
            <div className={classes.dislikeInfo} onClick={dislikeHandler}>
                {isDisliked ? <ThumbDown/> : <ThumbDownOutlined/>}
                <span className={classes.dislikesCount}>{dislikes}</span>
            </div>
        </div>
    );
};

export default LikeDislikeControls;