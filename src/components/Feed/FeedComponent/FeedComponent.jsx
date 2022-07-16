import React from 'react';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import ShareForm from '../ShareForm/ShareForm';
import classes from './FeedComponent.module.scss';
import PostModalWindow from '../PostModalWindow/PostModalWindow';
import { checkPolicy } from '../../../util/CheckPolicy';
import PostComponent from '../Post/PostComponent/PostComponent';
import LoaderShell from '../../MinorComponents/LoaderShell/LoaderShell';

const FeedComponent = ({currentUser, getResults, group, token, profile, posts, page, more, isFetching, error, createMethod, ...props}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.messageForm}>
                {group 
                ? <>{checkPolicy(group, currentUser._id, group.policies.canCreatePosts)
                    ? <ShareForm currentUser={currentUser} token={token} group={group} createPost={createMethod}/>
                    : ''}</>
                : <>{currentUser._id === profile._id
                    ? <ShareForm currentUser={currentUser} token={token} createPost={createMethod}/>
                    : ''
                    }</>
                }
            </div>
            <LoaderShell getResults={getResults} isFetching={isFetching} page={page} more={more} elementId={'feed'}>
                <div className={classes.postsContainer} id='feed'>         
                    {(isFetching && posts.length === 0) 
                    ? <Preloader/> 
                    :   <>{(posts.length === 0 && error) 
                        ? <span className={classes.message}>{error}</span>
                        : <>{posts.length > 0 
                            ?   <> {posts.map((post) => {
                                    return <PostComponent currentUser={currentUser} token={token} group={group} post={post} key={post._id} likeGroupPost={props.likeGroupPost} dislikeGroupPost={props.dislikeGroupPost}/>;
                                })}
                                {isFetching && posts ? <Preloader/> : ''}
                            </>
                            : <span className={classes.message}>There is no posts here now.</span>
                            }
                        </>}</>
                    } 
                </div>
            </LoaderShell>
            <PostModalWindow opened={props.modalPostOpened} setOpened={props.setModalPostOpened} syncronizePost={props.syncronizeUpdate} syncronizeDelete={props.syncronizeDelete} syncronizeLike={props.syncronizeLike} syncronizeDislike={props.syncronizeDislike}/>
        </div>
    );
};

export default FeedComponent;