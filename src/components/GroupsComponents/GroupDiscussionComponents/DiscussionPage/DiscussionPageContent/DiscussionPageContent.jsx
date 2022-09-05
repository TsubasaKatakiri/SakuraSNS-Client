import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkIsMember, checkPolicy } from '../../../../../util/CheckPolicy';
import DiscussionPageControls from '../DiscussionPageControls/DiscussionPageControls';
import classes from './DiscussionPageContent.module.scss';
import DeletionModal from './../../../../MinorComponents/DeletionModal/DeletionModal';
import DiscussionPostList from '../DiscussionPostList/DiscussionPostList';

const DiscussionPageContent = ({currentUser, token, group, discussion, opened, setOpened, handleOpen, lockDiscussion, hideDiscussion, deleteMethod}) => {
    const groupId = useParams().groupId;
    const discussionId = useParams().discussionId;
    const isDark = document.body.classList.contains('dark');
    const [isLocked, setIsLocked] = useState(discussion.isClosed);
    const [isPrivate, setIsPrivate] = useState(discussion.isPrivate);
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canDeleteDiscussions);

    const handleLock = () => {
        setIsLocked(!isLocked);
        lockDiscussion(groupId, discussionId, currentUser._id, token)
    }

    const handlePrivate = () => {
        setIsPrivate(!isPrivate);
        hideDiscussion(groupId, discussionId, currentUser._id, token)
    }

    return (
        <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
            {isPrivate && !checkIsMember(group, currentUser._id)
            ?   <span className={classes.message}>Access forbidden: Only group members can view this discussion.</span>
            :   <>
                    <DiscussionPageControls discussion={discussion} isAllowed={isAllowed} isPrivate={isPrivate} isLocked={isLocked} handleLock={handleLock} handlePrivate={handlePrivate} handleOpenDelete={handleOpen}/>
                    <DiscussionPostList/>
                    <DeletionModal caption={'Do you want to delete this discussion?'} opened={opened} setOpened={setOpened} deleteMethod={deleteMethod}/>
                </>
            }
        </div>
    );
};

export default DiscussionPageContent;