import React from 'react';
import WidgetShell from '../../MinorComponents/WidgetShell/WidgetShell';
import classes from './GroupWidget.module.scss';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import GroupThumbnail from './GroupThumbnail/GroupThumbnail';

const GroupWidget = ({profile}) => {
    const groupList = profile.groups.length > 5 ? profile.groups.slice(0, 5) : profile.groups;
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <section className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <GroupIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>{profile.lastName}'s groups ({profile.groups.length})</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`../groups/user/${profile._id}`} className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    {groupList.map(group => {
                        return <GroupThumbnail key={group._id} group={group}/> 
                    })}
                </div>
            </section>
        </WidgetShell>
    );
};

export default GroupWidget;