import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPost, changePostPage, deletePost, getPosts, resetPosts } from '../../../../../redux/GroupDiscussionPost/GroupDiscussionPostActions';
import { checkPolicy } from '../../../../../util/CheckPolicy';
import DiscussionPostListContent from '../DiscussionPostListContent/DiscussionPostListContent';

const DiscussionPostList = ({currentUser, token, posts, page, totalPages, getPosts, resetPosts, ...props}) => {
    const isAllowed = checkPolicy(props.group, currentUser._id, props.group.policies.canDeleteDiscussions);
    const isLocked = props.discussion.isClosed;
    const groupId = useParams().groupId;
    const discussionId = useParams().discussionId;

    useEffect(() => {
        getPosts(groupId, discussionId, currentUser._id, token);
        return () => resetPosts();
    }, []);

    const onPageChanged = (pageNumber) => {
        changePostPage(pageNumber);
        getPosts(groupId, discussionId, currentUser._id, token, pageNumber)
    }

    const handleAddPost = (postData) => {
        props.addPost(groupId, discussionId, postData, token)
    }

    const handleDeletePost = (postId) => {
        props.deletePost(groupId, discussionId, postId, currentUser._id, token)
    }

    return <DiscussionPostListContent currentUser={currentUser} posts={posts} isAllowed={isAllowed} isLocked={isLocked} isFetching={props.isFetching} error={props.error} page={page} totalPages={totalPages} onPageChanged={onPageChanged} handleAddPost={handleAddPost} handleDeletePost={handleDeletePost}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        discussion: state.discussion.discussion,
        posts: state.discussionPost.posts,
        page: state.discussionPost.page,
        totalPages: state.discussionPost.totalPages,
        more: state.discussionPost.more,
        isFetching: state.discussionPost.isFetching,
        error: state.discussionPost.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (groupId, discussionId, userId, token, page) => {dispatch(getPosts(groupId, discussionId, userId, token, page))},
        resetPosts: () => {dispatch(resetPosts())},
        changePostPage: (page) => {dispatch(changePostPage(page))},
        addPost: (groupId, discussionId, postData, token) => {dispatch(addPost(groupId, discussionId, postData, token))},
        deletePost: (groupId, discussionId, postId, userId, token) => {dispatch(deletePost(groupId, discussionId, postId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionPostList);