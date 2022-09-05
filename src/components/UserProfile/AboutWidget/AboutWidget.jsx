import React, { useState } from 'react';
import WidgetShell from '../../MinorComponents/WidgetShell/WidgetShell';
import classes from './AboutWidget.module.scss';
import InfoIcon from '@mui/icons-material/Info';
import MainInfoBlock from './MainInfo/MainInfoBlock';
import SecondaryInfo from './SecondaryInfo/SecondaryInfo';

const AboutWidget = ({profile}) => {
    const [opened, setOpened] = useState(false);
    const handleExtend = () => setOpened(!opened);
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <section className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <InfoIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>About me</h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <span className={classes.control} onClick={handleExtend}>{opened ? 'Less...' : 'More...'}</span>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                    <MainInfoBlock profile={profile}/>
                    {opened 
                    ?   <SecondaryInfo profile={profile}/>
                    :   <span className={classes.message}>Click "More" to reveal more info...</span> 
                    }
                </div>
            </section>
        </WidgetShell>
    );
};

export default AboutWidget;