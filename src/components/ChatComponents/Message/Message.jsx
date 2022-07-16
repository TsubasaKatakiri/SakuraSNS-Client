import React, { useState } from 'react';
import TimeAgo from 'timeago-react';
import AudioList from '../../MinorComponents/AudioList/AudioList';
import Slider from '../../Slider/Slider';
import classes from './Message.module.scss';
import { Delete } from '@material-ui/icons';
import avatar from '../../../images/noAvatar.png';

const Message = ({message, own, removeMessage, currentUser, token}) => {
    const [openedOptions, setOpenedOptions] = useState(false);
    const sliderContent = message.attachments.filter(element => element.type !== 'audio' || element.type !=='other');
    const audioContent = message.attachments.filter(element => element.type === 'audio');
    const isDark = currentUser.userSettings.isDarkMode;

    const handleOpenedOptions = () => {
        if(own) setOpenedOptions(!openedOptions);
    }

    const handleDeletion = () => {
        setOpenedOptions(false);
        removeMessage(message._id, currentUser._id, token);
    }

    return (
        <div className={`${classes.message} ${own ? classes.own : ''} ${isDark ? classes.night: ''}`}> 
            <div className={`${classes.messageTop} ${own ? classes.own : ''}`}>
                <img src={message.sender.profilePicture ? message.sender.profilePicture : avatar} alt='' className={classes.messageAvatar}/>
                <div className={`${classes.messageContent} ${own ? classes.own : ''}`} onDoubleClick={handleOpenedOptions}>
                    <div className={classes.mediafileContainer}>
                        <Slider sliderContent={sliderContent}/>
                    </div> 
                    <AudioList audioContent={audioContent}/>
                    <p className={`${classes.messageText} ${own ? classes.own : ''}`}>{message.text}</p>
                </div>
                {openedOptions 
                ?   <div className={classes.optionsBar}>
                        <Delete className={classes.option} onClick={handleDeletion}/>
                    </div>
                : ''
                }
            </div>
            <div className={`${classes.messageBottom} ${own ? classes.own : ''}`}>
                <TimeAgo datetime={message.createdAt} locale='en_US' live={true}/>
            </div>
        </div>
    );
};

export default Message;