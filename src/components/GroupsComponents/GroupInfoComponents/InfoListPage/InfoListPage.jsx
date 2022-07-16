import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewInfo, getInfoList, resetInfo } from '../../../../redux/GroupInfoList/GroupInfoListActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import InfoPageContent from './InfoPageContent/InfoPageContent';
import classes from './InfoListPage.module.scss';

const InfoListPage = ({currentUser, token, group, infoList, isFetching, error, getInfo, resetInfo, addInfo}) => {
    const groupId = useParams().groupId;
    const [opened, setOpened] = useState(false)

    const handleOpen = () =>  setOpened(!opened);

    if(opened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    useEffect(() => {
        getInfo(groupId, token);
        return resetInfo();
    }, [])

    const addMethod = (infoData) => {
        addInfo(groupId, infoData, token);
    }

    return (
        <GroupPageContainer>
            <InfoPageContent currentUser={currentUser} token={token} group={group} infoList={infoList} isFetching={isFetching} error={error} handleOpen={handleOpen} opened={opened} setOpened={setOpened} addMethod={addMethod}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        infoList: state.infoList.info,
        isFetching: state.infoList.isFetching,
        error: state.infoList.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfo: (groupId, token) => {dispatch(getInfoList(groupId, token))},
        resetInfo: () => {dispatch(resetInfo())},
        addInfo: (groupId, infoData, token) => {dispatch(addNewInfo(groupId, infoData, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoListPage);