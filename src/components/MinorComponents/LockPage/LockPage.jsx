import React from 'react';
import classes from './LockPage.module.scss';
import LockIcon from '@mui/icons-material/Lock';

const LockPage = ({group}) => {
    return (
        <div className={classes.wrapper}>
            <LockIcon className={classes.noticeIcon}/>
            <span className={classes.noticeHeader}>Access forbidden</span>
            {group
                ? <span className={classes.noticeText}>Only members of this group can see this content.</span>
                : <span className={classes.noticeText}>This user has restricted access to this page.</span>
            }
        </div>
    );
};

export default LockPage;