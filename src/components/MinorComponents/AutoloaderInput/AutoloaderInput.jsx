import React, { useState } from 'react';
import classes from './AutoloaderInput.module.css';
import { v4 as uuidv4 } from 'uuid';
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import storage from "../../../storage/firebase";

const AutoloaderInput = ({setDownloadUrl, fileRef, type}) => {
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        const file = e.target.files[0];
        const filename = uuidv4() + file.name;
        const storageRef = ref(storage, `/image/${filename}`);
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
                    setDownloadUrl(url);
                })
            }
        )
    }

    return (
        <div className={classes.autoloaderContainer}>
            <input type="file" ref={fileRef} className={classes.fileInput} onChange={handleChange} accept={type === null ? "*" : `${type}/*`}/>
            <span className={classes.progress}>{progress === 0 ? "" : progress === 100 ? 'File uploaded' : `Uploading... ${progress}%`}</span>
        </div>
    );
};

export default AutoloaderInput;