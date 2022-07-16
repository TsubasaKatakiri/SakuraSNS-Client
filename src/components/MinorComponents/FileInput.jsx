import React, { useState } from 'react';
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import storage from "../../storage/firebase";
import classes from "./FileInput.module.css";
import { v4 as uuidv4 } from 'uuid'
import { FileAPI } from '../../api/FileApi';

const FileInput = ({currentUser, token, fileRef, setAttachments, files, setFiles}) => {
    const [progress, setProgress] = useState(0);

    const removeItem = (file)=>{
        setFiles(files.filter(element => element !== file));
    }

    const handleChange = (e) => {
        for(let element of e.target.files){
            const file = element;
            setFiles((prevState) => [...prevState, file]);
        }
    }

    const handleUpload = () => {
        const promises = [];
        files.map(file => {
            const type=file.type.split('/')[0];
            let link = ``;
            const filename = uuidv4() + file.name;
            if (type === 'audio' || type === 'video' || type === 'image') link = `/${type}/${filename}`;
            else link = `other/${filename}`;
            const storageRef = ref(storage, link);
            const uploadTask = uploadBytesResumable(storageRef, file);
            promises.push(uploadTask);
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
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    try{
                        const newFile = {name: filename, file: url, type: type, uploader: currentUser._id};
                        const res = await FileAPI.create(newFile, token);
                        setAttachments((prevState) => [...prevState, res.file._id]);
                    }catch(e){
                        console.log(e);
                    }
                }
            )
        })
        Promise.all(promises)
            .then(() => {
                console.log("All files uploaded");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={classes.container}>
            <input type="file" ref={fileRef} className={classes.input} multiple onChange={handleChange}/>
            <div className={classes.upload}>
                <div className={classes.uploadFiles}>
                    {files ? files.map((f, index)=>{
                        if(f.type.split('/')[0] === "image"){
                            console.log(f);
                            return (
                                <div className={classes.imageWrapper} key={index} onClick={()=>{removeItem(f)}}>
                                    <img src={URL.createObjectURL(f)} alt="image" className={classes.image}/>
                                    <div className={classes.imageOverlay}>&times;</div>
                                </div>
                            )
                        } else if(f.type.split('/')[0] === "audio"){
                            console.log(f);
                            return (
                                <div className={classes.audioWrapper} key={index}>
                                    <audio src={URL.createObjectURL(f)} controls className={classes.audio}/>
                                    <span className={classes.removeButton} onClick={()=>{removeItem(f)}}>&times;</span>
                                </div>
                            )
                        } else if(f.type.split('/')[0] === "video"){
                            console.log(f);
                            return (
                                <div className={classes.imageWrapper} key={index} onClick={()=>{removeItem(f)}}>
                                    <video src={URL.createObjectURL(f)} alt="image" key={index} className={classes.image}/>
                                    <div className={classes.imageOverlay}>&times;</div>
                                </div>
                            )
                        } else {
                            console.log(f);
                            return (
                                <a href={URL.createObjectURL(f)} key={index} >{URL.createObjectURL(f)}</a>
                            )
                        }
                    }) : ""}
                </div>
                {files.length > 0 ? <div className={classes.buttonBlock}>
                    <button type="button" className={classes.button} onClick={handleUpload}>
                        {progress === 0 ? "Upload" : progress === 100 ? "Uploaded" : `${progress}%`}
                    </button>
                    <button type="button" className={classes.button} onClick={()=>{setFiles([]); setProgress(0)}}>Clear</button>
                </div>
                 : ""}
            </div>
        </div>
    );
};

export default FileInput;