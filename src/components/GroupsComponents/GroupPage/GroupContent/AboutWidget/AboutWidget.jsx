import React, { useEffect, useState } from 'react';
import WidgetShell from '../../../../MinorComponents/WidgetShell/WidgetShell';
import classes from './AboutWidget.module.scss';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import MainInfoBlock from './MainInfoBlock/MainInfoBlock';
import { connect } from 'react-redux';
import { getGroupInfo, resetGroupInfo } from '../../../../../redux/GroupContent/GroupContentActions';
import SecondaryInfoBlock from './SecondaryInfoBlock/SecondaryInfoBlock';

const AboutWidget = ({currentUser, token, group, info, isFetching, error, getInfo, resetInfo}) => {
    const [opened, setOpened] = useState(false);
    const handleExtend = () => setOpened(!opened);
    const isDark = document.body.classList.contains('dark');

    useEffect(() => {
        getInfo(group._id, token);
        return resetInfo();
    }, []) 

    return (
        <WidgetShell>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <InfoIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>About me</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`/groups/${group._id}/info`} className={classes.control}>Info</Link>
                        <span className={classes.control} onClick={handleExtend}>{opened ? 'Less...' : 'More...'}</span>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    <MainInfoBlock group={group}/>
                    {opened 
                    ?   <SecondaryInfoBlock info={info} isFetching={isFetching} error={error}/>
                    :   <span className={classes.message}>Click "More" or "Info" to reveal more info...</span> 
                    }
                </div>
            </div>
        </WidgetShell>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        info: state.groupContent.info,
        isFetching: state.groupContent.isFetchingInfo,
        error: state.groupContent.errorInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfo: (userId, token) => {dispatch(getGroupInfo(userId, token))},
        resetInfo: () => {dispatch(resetGroupInfo())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutWidget);