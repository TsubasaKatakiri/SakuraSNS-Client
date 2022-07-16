import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import ManualLoadFileInput from '../../MinorComponents/ManualLoadFileInput/ManualLoadFileInput';
import SimpleTextarea from '../../MinorComponents/SimpleTextarea/SimpleTextarea';
import classes from './MessageForm.module.scss';
import SimpleButton from './../../MinorComponents/SimpleButton/SimpleButton';

const MessageForm = ({addMessage, currentUser, token, conversationId}) => {
    const fileRef = useRef();
    const [files, setFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const isDark = currentUser.userSettings.isDarkMode;

    return (
        <Formik
            initialValues={{
                text: '',
            }}
            onSubmit = {async (values, {resetForm})=>{
                let readyAttachments = attachments.map(a => {return a.file._id});
                const message = {sender: currentUser._id, text: values.text, attachments: readyAttachments, conversationId};
                addMessage(message, token);
                setAttachments([]);
                setFiles([]);
                resetForm({values: {
                    text: '',
                }});
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.top}>
                    <div className={classes.input}>
                        <SimpleTextarea name='text' placeholder='Enter your message...'/>
                    </div>
                    <div className={classes.controls}>
                        <SimpleButton type='submit'>Send</SimpleButton>
                        <SimpleButton type='button' onClick={() => fileRef.current.click()}>Attachments...</SimpleButton>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <ManualLoadFileInput currentUser={currentUser} token={token} fileRef={fileRef} readyFiles={attachments} setReadyFiles={setAttachments} files={files} setFiles={setFiles} multiple={true}/>
                </div>
            </Form>
        </Formik>
    );
};

export default MessageForm;