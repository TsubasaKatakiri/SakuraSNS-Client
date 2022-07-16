import React from 'react';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import classes from './GroupSettings.module.scss';
import { updateGroupInfo, updateGroupPolicies } from '../../../redux/Group/GroupActions';
import { connect } from 'react-redux';
import { checkIfAdministrative } from '../../../util/CheckPolicy';
import GroupPageContainer from '../GroupPageContainer/GroupPageContainer';
import LinksBlock from './LinksBlock/LinksBlock';
import SettingsRibbon from './SettingsRibbon/SettingsRibbon';

const GroupSettings = ({currentUser, token, group, isFetching, updateGroupInfo, updateGroupPolicies}) => {
    return (
        <GroupPageContainer>
            <div className={classes.wrapper}>
                {!group || isFetching ? <Preloader/>
                :   <>{checkIfAdministrative(group, currentUser._id) 
                    ?   <>
                            <SettingsRibbon currentUser={currentUser} token={token} group={group} updateGroupPolicies={updateGroupPolicies} updateGroupInfo={updateGroupInfo}/>
                            <LinksBlock/>
                        </>
                    : <span className={classes.message}>Access forbidden: You are not allowed to access this page.</span>
                    }</>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGroupInfo: (groupId, infoData, token) => {dispatch(updateGroupInfo(groupId, infoData, token))},
        updateGroupPolicies: (groupId, policiesData, token) => {dispatch(updateGroupPolicies(groupId, policiesData, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSettings);