import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupInfoAPI } from '../../../../api/GroupInfoBlockApi';
import { getInfoBlock, resetCurrentInfo, updateInfoBlock } from '../../../../redux/GroupInfo/GroupInfoActions';
import GroupPageContainer from '../../GroupPageContainer/GroupPageContainer';
import InfoPageContent from './InfoPageContent/InfoPageContent';
import classes from './InfoPage.module.scss';


const InfoPage = ({currentUser, token, group, infoBlock, isFetching, error, getInfo, resetInfo, updateInfo}) => {
    const groupId = useParams().groupId;
    const infoId = useParams().infoId;
    const [openedEdit, setOpenedEdit] = useState(false);
    const [openedDelete, setOpenedDelete] = useState(false);
    const navigate = useNavigate();

    const handleOpenEdit = () => setOpenedEdit(!openedEdit);
    const handleOpenDelete = () => setOpenedDelete(!openedDelete);

    if(openedEdit || openedDelete) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    useEffect(() => {
        getInfo(infoId, token);
        return () => resetInfo();
    }, [])

    const editMethod = (infoData) => {
        updateInfo(groupId, infoId, infoData, token);
    }

    const deleteMethod = async () => {
        try {
            await GroupInfoAPI.deleteInfoBlock(groupId, infoId, currentUser._id, token);
            navigate(`/groups/${groupId}/info`);
        } catch (e) {}
    }

    return (
        <GroupPageContainer>
            <InfoPageContent currentUser={currentUser} token={token} infoBlock={infoBlock} group={group} isFethching={isFetching} error={error} openedEdit={openedEdit} setOpenedEdit={setOpenedEdit} handleOpenEdit={handleOpenEdit} openedDelete={openedDelete} setOpenedDelete={setOpenedDelete} handleOpenDelete={handleOpenDelete} editMethod={editMethod} deleteMethod={deleteMethod}/>
        </GroupPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        infoBlock: state.groupInfo.infoBlock,
        isFetching: state.groupInfo.isFetching,
        error: state.groupInfo.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfo: (infoId, token) => {dispatch(getInfoBlock(infoId, token))},
        updateInfo: (groupId, infoId, infoData, token) => {dispatch(updateInfoBlock(groupId, infoId, infoData, token))},
        resetInfo: () => {dispatch(resetCurrentInfo())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);