import React, { useEffect, useState } from 'react';
import LikeDislikeControls from './LikeDislikeControls';

const LikeDislikeControlsContainer = ({entryId, like, dislike, currentUser, likeMethod, dislikeMethod, token}) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [dislikes, setDislikes] = useState(0);
    const [isDisliked, setIsDisliked] = useState(false);

    useEffect(()=>{
        setLikes(like.length);
        setDislikes(dislike.length);
        return () => {
            setLikes(0);
            setDislikes(0);
        }
    }, [])

    useEffect(() => {
        setIsLiked(like.includes(currentUser._id));
    }, [currentUser._id, like]);

    useEffect(() => {
        setIsDisliked(dislike.includes(currentUser._id));
    }, [currentUser._id, dislike]);

    const likeHandler = async ()=>{
        try {
            await likeMethod(entryId, currentUser._id, token);
            if(isDisliked){
                setDislikes(dislikes - 1);
                setIsDisliked(false);
            }
            setLikes(isLiked ? likes - 1 : likes + 1);
            setIsLiked(!isLiked);
        } catch (e) {}
    }

    const dislikeHandler = async ()=>{
        try {
            await dislikeMethod(entryId, currentUser._id, token);
            if(isLiked){
                setLikes(likes - 1);
                setIsLiked(false);
            }
            setDislikes(isDisliked ? dislikes - 1 : dislikes + 1);
            setIsDisliked(!isDisliked);
        } catch (e) {}
    }

    return <LikeDislikeControls likeHandler={likeHandler} isLiked={isLiked} likes={likes} dislikeHandler={dislikeHandler} isDisliked={isDisliked} dislikes={dislikes}/>
};

export default LikeDislikeControlsContainer;