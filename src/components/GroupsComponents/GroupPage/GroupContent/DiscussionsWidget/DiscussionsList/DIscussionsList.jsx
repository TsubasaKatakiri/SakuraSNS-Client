import React from 'react';
import DiscussionThumbnail from '../DiscussionThumbnail/DiscussionThumbnail';

const DIscussionsList = ({discussions, group}) => {
    const discussionList = discussions.length > 3 ? discussions.slice(0, 3) : discussions;

    return (
        <>{discussionList.map(discussion => {
            return <DiscussionThumbnail key={discussion._id} discussion={discussion} group={group}/> 
        })}</>
    );
};

export default DIscussionsList;