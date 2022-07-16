import React from 'react';
import PostContent from './PostContent';

const PostComponent = ({currentUser, token, group, post, likeGroupPost, dislikeGroupPost}) => {
    const sliderContent = post.attachments.filter(element => element.type !== 'audio' || element.type !=='other');
    const audioContent = post.attachments.filter(element => element.type === 'audio');

    const likeMethod = () => {
        likeGroupPost(post._id, currentUser._id, token);
    }

    const dislikeMethod = () => {
        dislikeGroupPost(post._id, currentUser._id, token);
    }

    return <PostContent currentUser={currentUser} post={post} group={group} likeMethod={likeMethod} dislikeMethod={dislikeMethod} sliderContent={sliderContent} audioContent={audioContent}/>; 
};

export default PostComponent;