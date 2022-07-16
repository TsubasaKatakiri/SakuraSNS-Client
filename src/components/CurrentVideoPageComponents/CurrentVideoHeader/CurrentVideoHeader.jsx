import React from 'react';
import { Link } from 'react-router-dom';
import SimpleSearchForm from '../../MinorComponents/SimpleSearchForm/SimpleSearchForm';
import classes from './CurrentVideoHeader.module.scss';
import { ChevronLeft, Videocam } from '@material-ui/icons';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const CurrentVideoHeader = ({isDark, query, setQueryMethod, group}) => {
    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <Videocam className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>Video</h3>
                </div>
                <SimpleSearchForm isDark={isDark} query={query} setQueryMethod={setQueryMethod}/>
                <div className={classes.controlGroup}>
                    <Link to={group ? `../` : '/video/search'} className={classes.control}>
                        <ChevronLeft className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>{group ? 'To Video List' : 'To Search'}</span>
                     </Link>
                    {group 
                        ?   <Link to={`../../${group._id}`} className={classes.control}>
                                <KeyboardDoubleArrowLeftIcon className={classes.controlIcon}/>
                                <span className={classes.controlCaption}>To group</span>
                            </Link>
                        :   ''
                    }
                </div>
            </div>
        </div>
    );
};

export default CurrentVideoHeader;