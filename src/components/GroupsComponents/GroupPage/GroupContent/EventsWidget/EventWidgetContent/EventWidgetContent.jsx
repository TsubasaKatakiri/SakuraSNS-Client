import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../../../../../MinorComponents/Preloader/Preloader';
import WidgetShell from '../../../../../MinorComponents/WidgetShell/WidgetShell';
import classes from './EventWidgetContent.module.scss';
import EventIcon from '@mui/icons-material/Event';
import EventList from '../EventList/EventList';

const EventWidgetContent = ({group, events, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <EventIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>Event info</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={`./event`} className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    {isFetching || !events
                        ? <Preloader/>
                        : <>{error
                            ? <span className={classes.message}>{error}</span>
                            : <EventList events={events} group={group}/>
                        }</>
                    }
                </div>
            </div>
        </WidgetShell>
    );
};

export default EventWidgetContent;