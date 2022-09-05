import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroup, resetGroup } from '../../../redux/Group/GroupActions';
import { checkIsMember } from '../../../util/CheckPolicy';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import classes from './GroupPageContainer.module.scss';

const GroupPageContainer = ({children, currentUser, token, group, isFetching, error, getGroup, resetGroup}) => {
    const groupId = useParams().groupId;

    useEffect(() => {
        getGroup(groupId, token);
        return resetGroup();
    }, []);

    if((!group && !error) || (!group && isFetching)) return <Preloader/>
    if(!group && error) return <div className={classes.wrapper}><span className={classes.message}>{error}</span></div>
    if(group && group.policies.isPrivate && !checkIsMember(group, currentUser._id)) return (
        <div className={classes.wrapper}>
            <span className={classes.message}>Access forbidden: Only group members can access this page.</span>
        </div>
    )

    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        isFetching: state.group.isFetching,
        error: state.group.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroup: (groupId, token) => {dispatch(getGroup(groupId, token))},
        resetGroup: () => {dispatch(resetGroup())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPageContainer);