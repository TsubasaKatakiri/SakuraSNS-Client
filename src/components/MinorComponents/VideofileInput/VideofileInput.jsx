import React, { useState } from 'react';
import classes from './VideofileInput.module.css';
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import storage from "../../../storage/firebase";
import { v4 as uuidv4 } from 'uuid'

const VideofileInput = ({fileRef, setVideofile}) => {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = () => {
        const filename = uuidv4() + file.name;
        const storageRef = ref(storage, `/audio/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "stateChanged",
            (snapshot) => {
                const uploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(uploaded);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    setVideofile(url);
                })
            }
        )
    };

    return (
        <div>
            <div className={classes.container}>
                <input type="file" ref={fileRef} className={classes.fileInput} onChange={handleChange} accept="video/*"/>
                <div className={classes.filePreview}>
                    {file ? 
                        <video src={URL.createObjectURL(file)} className={classes.video}/>
                    : ""}
                </div>
                {file ? 
                    <div className={classes.buttonBlock}>
                        <button type="button" className={classes.button} onClick={handleUpload}>
                            {progress === 0 ? "Upload" : progress === 100 ? "Uploaded" : `${progress}%`}
                        </button>
                        <button type="button" className={classes.button} onClick={()=>{setFile(null); setProgress(0)}}>Clear</button>
                    </div>
                : ""}
            </div>
        </div>
    );
};

export default VideofileInput;