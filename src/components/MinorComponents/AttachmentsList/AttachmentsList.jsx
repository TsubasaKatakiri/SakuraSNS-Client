import React from 'react';
import classes from './AttachmentsList.module.css';

const AttachmentsList = ({attachments, removeItem}) => {
    return (
        <div className={classes.wrapper}>
            {attachments.map((file, index) => {
                if(file.type.split('/')[0] === "image"){
                    return (
                        <div className={classes.imageWrapper} key={index} onClick={()=>{removeItem(file)}}>
                            <img src={file.file} alt="image" className={classes.image}/>
                            <div className={classes.imageOverlay}>&times;</div>
                        </div>
                    )
                } else if(file.type.split('/')[0] === "audio"){
                    return (
                        <div className={classes.audioWrapper} key={index}>
                            <audio src={file.file} controls className={classes.audio}/>
                            <span className={classes.removeButton} onClick={()=>{removeItem(file)}}>&times;</span>
                        </div>
                    )
                } else if(file.type.split('/')[0] === "video"){
                    return (
                        <div className={classes.imageWrapper} key={index} onClick={()=>{removeItem(file)}}>
                            <video src={file.file} alt="image" key={index} className={classes.image}/>
                            <div className={classes.imageOverlay}>&times;</div>
                        </div>
                    )
                } else {
                    return (
                        <a href={file.file} key={index}>{file.file}</a>
                    )
                }
            })}
        </div>
    );
};

export default AttachmentsList;