import React, { useRef, useState } from 'react';
import classes from './PostEditForm.module.scss';
import {Formik, Form} from 'formik';
import SimpleField from '../../../MinorComponents/SimpleField/SimpleField';
import SimpleTextarea from '../../../MinorComponents/SimpleTextarea/SimpleTextarea';
import AttachmentsList from '../../../MinorComponents/AttachmentsList/AttachmentsList';
import { transformTagString } from '../../../../util/TagTransformation';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';
import ManualLoadFileInput from './../../../MinorComponents/ManualLoadFileInput/ManualLoadFileInput';

const PostEditForm = ({currentUser, token, post, handleEditMode, editMethod}) => {
    const fileRef = useRef();
    const [attachments, setAttachments] = useState(post.attachments);
    const [newAttachments, setNewAttachments] = useState([]);
    const [files, setFiles] = useState([]);
    
    const removePresentItem = (file) => setAttachments(attachments.filter(a => a._id !== file._id));
    
    return (
        <Formik
            initialValues={{
                text: post.text,
                attachments: post.attachments,
                location: post.location,
                tags: post.tags.join(' '),
            }}
            onSubmit = {async (values) => {
                const tags = transformTagString(values.tags);
                let readyAttachments = [];
                if(attachments.length > 0) readyAttachments = attachments.map(a => {return a._id});
                let readyNewAttachments = newAttachments.map(a => {return a.file._id});
                const postData = {userId: currentUser._id, text: values.text, attachments: [...readyAttachments, ...readyNewAttachments], location: values.location, tags: tags};
                setNewAttachments([]);
                setFiles([]);
                editMethod(postData);
            }}
        >
            <Form className={classes.wrapper}>
                <SimpleTextarea placeholder={`Enter post text...`} name='text'/>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Location</h5>
                    <SimpleField name='location' type='text' placeholder='Your current location...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Tags</h5>
                    <SimpleField name='tags' type='text' placeholder='Tags...'/>
                </div>
                {attachments.length > 0 
                ?   <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Current Files</h5>
                        <AttachmentsList attachments={attachments} removeItem={removePresentItem}/>
                    </div>
                : ''
                }
                <div className={classes.input}>
                    <div className={classes.inlineControls}>
                        <h5 className={classes.inputHeader}>Add New Files</h5>
                        <SimpleButton type='button' onClick={() => fileRef.current.click()}>Add...</SimpleButton>
                    </div>
                    <ManualLoadFileInput currentUser={currentUser} token={token} files={files} setFiles={setFiles} fileRef={fileRef} readyFiles={newAttachments} setReadyFiles={setNewAttachments} multiple={true}/>
                </div>
                <div className={classes.bottom}>
                    <SimpleButton type='submit'>Commit changes</SimpleButton>
                    <SimpleButton type='button' onClick={handleEditMode}>Close</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default PostEditForm;