import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupDiscussions, resetGroupDiscussions } from '../../../../../redux/GroupContent/GroupContentActions';
import DiscussionWidgetContent from './DiscussionsWidgetContent/DiscussionWidgetContent';

const DiscussionsWidget = ({token, group, discussions, isFetching, error, getDiscussions, resetDiscussions}) => {
    useEffect(() => {
        getDiscussions(group._id, token);
        return resetDiscussions();
    }, []);

    return <DiscussionWidgetContent group={group} discussions={discussions} isFetching={isFetching} error={error}/>;
};

const mapStateToProps = (state) => {
    return{
        token: state.auth.token,
        group: state.group.group,
        discussions: state.groupContent.discussions,
        isFetching: state.groupContent.isFetchingDiscussions,
        error: state.groupContent.errorDiscussions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDiscussions: (groupId, token) => {dispatch(getGroupDiscussions(groupId, token))},
        resetDiscussions: () => {dispatch(resetGroupDiscussions())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionsWidget);