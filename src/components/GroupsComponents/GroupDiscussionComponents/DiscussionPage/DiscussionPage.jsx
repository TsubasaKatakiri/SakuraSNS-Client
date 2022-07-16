import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDiscussion, getDiscussion, hideDiscussion, lockDiscussion, resetDiscussion } from '../../../../redux/GroupCurrentDiscussion/GroupCurrentDiscussionActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import DiscussionPageContent from './DiscussionPageContent/DiscussionPageContent';
import DiscussionPageHeader from './DiscussionPageHeader/DiscussionPageHeader';
import classes from './DiscussionPage.module.scss';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import { GroupDiscussionAPI } from './../../../../api/GroupDiscussionApi';

const DiscussionPage = ({currentUser, token, group, discussion, getDiscussion, resetDiscussion, isFetching, error, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const groupId = useParams().groupId;
    const discussionId = useParams().discussionId;
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpened(!opened);

    useEffect(() => {
        getDiscussion(groupId, discussionId, currentUser._id, token);
        return () => resetDiscussion();
    }, []);

    const deleteMethod = async () => {
        try {
            await GroupDiscussionAPI.deleteDiscussion(groupId, discussionId, currentUser._id, token);
        } catch (error) {}
        navigate(`/groups/${groupId}/discussions`)
    }

    if(opened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    return (
        <GroupPageContainer>
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <DiscussionPageHeader/>
                {!discussion || isFetching
                ? <Preloader/>
                : <DiscussionPageContent currentUser={currentUser} token={token} group={group} discussion={discussion} opened={opened} setOpened={setOpened} handleOpen={handleOpen} lockDiscussion={props.lockDiscussion} hideDiscussion={props.hideDiscussion} deleteMethod={deleteMethod}/>
                }
            </div>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        discussion: state.discussion.discussion,
        isFetching: state.discussion.isFetching,
        error: state.discussion.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDiscussion: (groupId, discussionId, userId, token) => {dispatch(getDiscussion(groupId, discussionId, userId, token))},
        resetDiscussion: () => {dispatch(resetDiscussion())},
        hideDiscussion: (groupId, discussionId, userId, token) => {dispatch(hideDiscussion(groupId, discussionId, userId, token))},
        lockDiscussion: (groupId, discussionId, userId, token) => {dispatch(lockDiscussion(groupId, discussionId, userId, token))},
        deleteDiscussion: (groupId, discussionId, userId, token) => {dispatch(deleteDiscussion(groupId, discussionId, userId, token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionPage);