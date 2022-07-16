import React from 'react';
import classes from './PostBody.module.scss';
import { LocationOn } from '@material-ui/icons';
import Slider from './../../../Slider/Slider';
import AudioList from '../../../MinorComponents/AudioList/AudioList';

const PostBody = ({post, sliderContent, audioContent}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            {post.location ? <span className={classes.locationText}><LocationOn/>{post.location}</span> : ''}
            <p className={classes.postText}>{post.text}</p>
            <div className={classes.mediafileContainer}>
                <Slider sliderContent={sliderContent}/>
            </div> 
            <AudioList audioContent={audioContent}/>
        </div>
    );
};

export default PostBody;