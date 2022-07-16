import React, { useState } from 'react';
import classes from './ManualLoadFileInput.module.scss';
import { uploadBytesResumable, getDownloadURL, ref, deleteObject } from 'firebase/storage';
import storage from '../../../storage/firebase';
import { v4 as uuidv4 } from 'uuid'
import {FileAPI} from '../../../api/FileApi';
import SimpleButton from './../SimpleButton/SimpleButton';

const ManualLoadFileInput = ({currentUser, token, fileRef, files, setFiles, readyFiles, setReadyFiles, multiple = false, type}) => {
    const [message, setMessage] = useState('');
    // const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);


    const fileDeletion = async(file, userId, token) => {
        const deletionRef = ref(storage, file.file);
        await deleteObject(deletionRef);
        await FileAPI.deleteFile(file._id, userId, token);
    }

    const handleBulkItemRemoval = async ()=>{
        if(readyFiles.length > 0){
            const promises = [];
            for(let f of readyFiles){
                const file = f.file;
                promises.push(fileDeletion(file, currentUser._id, token))
            }
            Promise.all(promises)
            .then(() => console.log('All files deleted'))
            .catch((err) => console.log('An error has occured during files deletion'));
            setReadyFiles([]);
        }
        setFiles([]); 
        setProgress(0);
    }

    const handleItemRemoval = async (file)=>{
        const currentFile = files.filter(f => f.file !== file)[0];
        const index = currentFile.index;
        setFiles(files.filter(f => f.index !== index));
        const readyFile = readyFiles.filter(rf => rf.index === index);
        if(readyFile.length > 0){
            try {
                const deletionFile = readyFile[0].file;
                await fileDeletion(deletionFile, currentUser._id, token)
                setReadyFiles(readyFiles.filter(f => f.index !== index));
                console.log('File deleted');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        for(let file of event.target.files){
            const index = uuidv4();
            setFiles((prevState) => [...prevState, {file: file, index: index}]);
        }
    }

    const handleUpload = () => {
        const promises = [];
        files.forEach(f => {
            const type = f.file.type.split('/')[0];
            let link = ``;
            const filename = uuidv4() + f.file.name;
            if (type === 'audio' || type === 'video' || type === 'image') link = `/${type}/${filename}`;
            else link = `other/${filename}`;
            const storageRef = ref(storage, link);
            const uploadTask = uploadBytesResumable(storageRef, f.file);
            promises.push(uploadTask);
            uploadTask.on(
                "stateChanged",
                (snapshot) => {
                    const uploaded = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(uploaded);
                },
                (error) => {
                    setMessage('An error has occured during file uploading');
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    try{
                        const newFile = {name: filename, file: url, type: type, uploader: currentUser._id};
                        const res = await FileAPI.create(newFile, token);
                        setReadyFiles((prevState) => [...prevState, {file: res.file, index: f.index}]);
                    }catch(e){
                        console.log(e);
                    }
                }
            )
        })
        Promise.all(promises)
            .then(() => {
                setMessage('All files uploaded');
            })
            .catch((err) => setMessage('An error has occured during file uploading'));
    };

    return (
        <div className={classes.container}>
            <input type='file' ref={fileRef} className={classes.input} multiple={multiple} onChange={handleChange} accept={type === null ? '*' : `${type}/*`}/>
            <div className={classes.upload}>
                <div className={classes.uploadFiles}>
                    {files ? files.map((f, index)=>{
                        if(f.file.type.split('/')[0] === 'image'){
                            return (
                                <div className={classes.imageWrapper} key={index} onClick={()=>{handleItemRemoval(f)}}>
                                    <img src={URL.createObjectURL(f.file)} alt='' className={classes.image}/>
                                    <div className={classes.imageOverlay}>&times;</div>
                                </div>
                            )
                        } else if(f.file.type.split('/')[0] === 'audio'){
                            return (
                                <div className={classes.audioWrapper} key={index}>
                                    <audio src={URL.createObjectURL(f.file)} controls className={classes.audio}/>
                                    <span className={classes.removeButton} onClick={()=>{handleItemRemoval(f)}}>&times;</span>
                                </div>
                            )
                        } else if(f.file.type.split('/')[0] === 'video'){
                            return (
                                <div className={classes.imageWrapper} key={index} onClick={()=>{handleItemRemoval(f)}}>
                                    <video src={URL.createObjectURL(f.file)} alt='' key={index} className={classes.image}/>
                                    <div className={classes.imageOverlay}>&times;</div>
                                </div>
                            )
                        } else {
                            return (
                                <a href={URL.createObjectURL(f.file)} key={index} >{URL.createObjectURL(f.file)}</a>
                            )
                        }
                    }) : ""}
                </div>
                {files.length > 0 ? <div className={classes.buttonBlock}>
                    <SimpleButton type='button' onClick={handleUpload}>
                        {progress === 0 ? 'Upload' : progress === 100 ? 'Uploaded' : `${progress}%`}
                    </SimpleButton>
                    <SimpleButton type='button'  onClick={handleBulkItemRemoval}>Clear</SimpleButton>
                </div>
                 : ''}
            </div>
        </div>
    );
};

export default ManualLoadFileInput;