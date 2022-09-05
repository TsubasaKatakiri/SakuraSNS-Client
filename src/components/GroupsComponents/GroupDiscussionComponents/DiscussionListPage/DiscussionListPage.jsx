import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addDiscussion, getDiscussions, resetDiscussions } from '../../../../redux/GroupDiscussionsList/GroupDiscussionListActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import DiscussionListPageContent from './DiscussionListPageContent/DiscussionListPageContent';
import classes from './DiscussionListPage.module.scss';

const DiscussionListPage = ({currentUser, token, group, discussions, isFetching, error, getDiscussions, resetDiscussions, addDiscussion}) => {
    const groupId = useParams().groupId;
    const [opened, setOpened] = useState(false);

    if(opened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const handleOpen = () => setOpened(!opened);

    useEffect(() => {
        getDiscussions(groupId, token);
        return () => resetDiscussions();
    }, []);

    const addMethod = (discussionData) => {
        addDiscussion(groupId, discussionData, token);
    }

    return (
        <GroupPageContainer>
            <DiscussionListPageContent currentUser={currentUser} group={group} discussions={discussions} isFetching={isFetching} error={error} handleOpen={handleOpen} opened={opened} setOpened={setOpened} addMethod={addMethod}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        discussions: state.discussionList.discussions,
        isFetching: state.discussionList.isFetching,
        error: state.discussionList.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDiscussions: (groupId, token) => {dispatch(getDiscussions(groupId, token))},
        resetDiscussions: () =>{dispatch(resetDiscussions())},
        addDiscussion: (groupId, discussion, token) => {dispatch(addDiscussion(groupId, discussion, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionListPage);