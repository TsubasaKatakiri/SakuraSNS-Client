import React from 'react';
import classes from './DiscussionWidgetContent.module.scss';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import WidgetShell from '../../../../../MinorComponents/WidgetShell/WidgetShell';
import { Link } from 'react-router-dom';
import DIscussionsList from '../DiscussionsList/DIscussionsList';
import Preloader from '../../../../../MinorComponents/Preloader/Preloader';

const DiscussionWidgetContent = ({group, discussions, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <SpeakerNotesIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>Discussions</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`./discussions`} className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    {isFetching || !discussions
                        ? <Preloader/>
                        : <>{error
                            ? <span className={classes.message}>{error}</span>
                            : <DIscussionsList discussions={discussions} group={group}/>
                        }</>
                    }
                </div>
            </div>
        </WidgetShell>
    );
};

export default DiscussionWidgetContent;