import React from 'react';
import classes from './InfoListHeader.module.scss';
import InfoIcon from '@mui/icons-material/Info';
import { Add, ChevronLeft } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { checkPolicy } from '../../../../../util/CheckPolicy';

const InfoListHeader = ({currentUser, group, handleOpen}) => {
    const isDark = document.body.classList.contains('dark');
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canEditGroupInfo);

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <InfoIcon className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Group Information</h3>
                </div>
                <div className={classes.controlGroup}>
                    {isAllowed 
                    ?   <span className={classes.control} onClick={handleOpen}>
                            <Add className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Add...</span>
                        </span>
                    : ''}
                    <Link to={`/groups/${group._id}`} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>To group</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InfoListHeader;