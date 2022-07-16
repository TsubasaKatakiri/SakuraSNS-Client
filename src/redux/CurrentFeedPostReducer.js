import { CommentAPI } from "../api/CommentApi";
import { PostAPI } from "../api/PostApi";

const GET_POST_PROGRESS = "GET_POST_PROGRESS";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_FAIL = "GET_POST_FAIL";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";
const DISLIKE_POST = "DISLIKE_POST";

const GET_COMMENTS_PROGRESS = "GET_COMMENTS_PROGRESS";
const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
const GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL";
const ADD_POST_COMMENT = "ADD_POST_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_POST_COMMENT = "DELETE_POST_COMMENT";
const LIKE_COMMENT = "LIKE_COMMENT";
const DISLIKE_COMMENT = "DISLIKE_COMMENT";

const RESET_POST = "RESET_POST";


const initialState = {
    post: null,
    isFetching: false,
    error: null,
    comments: null,
    isFetchingComments: false,
    errorComments: null,
}


const CurrentFeedPostReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_POST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                post: action.payload,
            };
        case GET_POST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case EDIT_POST:
            return {
                ...state, 
                post: action.payload,
            };
        case DELETE_POST:
        case RESET_POST:
            return {
                ...state, 
                post: null,
                isFetching: false,
                error: null,
                comments: null,
                isFetchingComments: false,
                errorComments: null,
            };
        case LIKE_POST:
            return {
                ...state, 
                post: { 
                    ...state.post, 
                    likes: state.post.likes.includes(action.payload.userId) 
                        ? state.post.likes.filter(e => e !== action.payload.userId)
                        : [...state.post.likes, action.payload.userId],
                    dislikes: state.post.dislikes.includes(action.payload.userId) 
                        ? state.post.dislikes.filter(e => e !== action.payload.userId)
                        : state.post.dislikes
                }
            };
        case DISLIKE_POST:
            return {
                ...state, 
                post: { 
                    ...state.post, 
                    dislikes: state.post.dislikes.includes(action.payload.userId) 
                        ? state.post.dislikes.filter(e => e !== action.payload.userId)
                        : [...state.post.dislikes, action.payload.userId],
                    likes: state.post.likes.includes(action.payload.userId) 
                        ? state.post.likes.filter(e => e !== action.payload.userId)
                        : state.post.likes
                }
            };
        case GET_COMMENTS_PROGRESS:
            return {
                ...state, 
                isFetchingComments: true,
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state, 
                isFetchingComments: false,
                comments: action.payload,
            };
        case GET_COMMENTS_FAIL:
            return {
                ...state, 
                isFetchingComments: false,
                errorComments: "An error has occured",
            };
        case ADD_POST_COMMENT:
            console.log(action.payload);
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, action.payload._id],
                },
                comments: [action.payload, ...state.comments],
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload._id) c=action.payload;
                    return c;
                })
            }
        case DELETE_POST_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(c => c !== action.payload),
                },
                comments: state.comments.filter(c=>c._id !== action.payload),
            }
        case LIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload.commentId){
                        return {
                            ...c,
                            dislikes: c.dislikes.includes(action.payload.userId) 
                                ? c.dislikes.filter(e => e !== action.payload.userId)
                                : c.dislikes,
                            likes: c.likes.includes(action.payload.userId) 
                                ? c.likes.filter(e => e !== action.payload.userId)
                                : [...c.likes, action.payload.userId]
                        }}
                    return c;
                })
            }
        case DISLIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload.commentId){
                        return {
                            ...c,
                            likes: c.likes.includes(action.payload.userId) 
                                ? c.likes.filter(e => e !== action.payload.userId)
                                : c.likes,
                            dislikes: c.dislikes.includes(action.payload.userId) 
                                ? c.dislikes.filter(e => e !== action.payload.userId)
                                : [...c.dislikes, action.payload.userId]
                        }}
                    return c;
                })
            }
        default:
            return state;
    }
}


const startGetPost = () => ({type: GET_POST_PROGRESS});
const successGetPost = (post) => ({type: GET_POST_SUCCESS, payload: post});
const failGetPost = () => ({type: GET_POST_FAIL});
export const resetPost = () => ({type: RESET_POST});
const editPost = (post) => ({type: EDIT_POST, payload: post});
const deletePost = (postId) => ({type: DELETE_POST, payload: postId});
const likePost = (postId, userId) => ({type: LIKE_POST, payload: {postId, userId}});
const dislikePost = (postId, userId) => ({type: DISLIKE_POST, payload: {postId, userId}});

const startGetComments = () => ({type: GET_COMMENTS_PROGRESS});
const successGetComments = (comments) => ({type: GET_COMMENTS_SUCCESS, payload: comments});
const failGetComments = () => ({type: GET_COMMENTS_FAIL});
const addPostComment = (comment) => ({type: ADD_POST_COMMENT, payload: comment});
const updatePostComment = (data) => ({type: EDIT_COMMENT, payload: data});
const deletePostComment = (commentId) => ({type: DELETE_POST_COMMENT, payload: commentId});
const likePostComment = (userId, commentId) => ({type: LIKE_COMMENT, payload: {userId, commentId}});
const dislikePostComment = (userId, commentId) => ({type: DISLIKE_COMMENT, payload: {userId, commentId}});


export const getFeedPost = (postId, token) => async (dispatch) => {
    dispatch(startGetPost());
    try{
        const res = await PostAPI.getPost(postId, token);
        dispatch(successGetPost(res.post));
    } catch (e){
        dispatch(failGetPost());
    }
};

export const editFeedPost = (postId, post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.update(postId, post, token);
        dispatch(editPost(res.post));
    } catch (e){}
};

export const deleteFeedPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(deletePost(postId));
    } catch (e){}
};

export const likeCurrentPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeCurrentPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const getFeedPostComments = (entryId, token) => async (dispatch) => {
    dispatch(startGetComments());
    try{
        const res = await CommentAPI.getComments(entryId, token);
        dispatch(successGetComments(res.comments));
    } catch (e){
        dispatch(failGetComments());
    }
};

export const addFeedPostComment = (comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.create(comment, token);
        dispatch(addPostComment(res.comment));
    } catch (e){}
};

export const updateFeedPostComment = (commentId, comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.update(commentId, comment, token);
        dispatch(updatePostComment(res.comment));
    } catch (e){}
};

export const deleteFeedPostComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.deleteComment(commentId, userId, token);
        dispatch(deletePostComment(commentId));
    } catch (e){}
};

export const likeFeedPostComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.like(commentId, userId, token);
        dispatch(likePostComment(userId, commentId));
    } catch (e){}
};

export const dislikeFeedPostComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.dislike(commentId, userId, token);
        dispatch(dislikePostComment(userId, commentId));
    } catch (e){}
};


export default CurrentFeedPostReducer;