import React, { useRef, useState } from 'react';
import classes from './ShareForm.module.scss';
import avatar from '../../../images/noAvatar.png';
import { Formik, Form } from 'formik';
import { Label, PermMedia, Room } from '@material-ui/icons';
import TextareaFeed from './../../MinorComponents/TextareaFeed';
import FileInput from '../../MinorComponents/FileInput';
import HidableField from '../../MinorComponents/HidableField/HidableField';
import { transformTagString } from '../../../util/TagTransformation';
import ManualLoadFileInput from '../../MinorComponents/ManualLoadFileInput/ManualLoadFileInput';

const ShareForm = ({currentUser, token, group, createPost}) => {
    const fileRef = useRef();
    const [files, setFiles] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const isDark = document.body.classList.contains('dark');

    const [openLocation, setOpenLocation] = useState(false);
    const [openTags, setOpenTags] = useState(false);

    const setLocationVisibility = () => setOpenLocation(!openLocation);
    const setTagsVisibility = () => setOpenTags(!openTags);

    return (
        <Formik
            initialValues={{
                text: '',
                attachments: [],
                location: '',
                tags: '',
            }}
            onSubmit = {async (values, {resetForm}) => {
                const tags = transformTagString(values.tags);
                let newPost;
                let readyAttachments = attachments.map(a => {return a.file._id});
                if(group) newPost = {userId: currentUser._id, text: values.text, groupId: group._id, attachments: readyAttachments, location: values.location, tags: tags};
                else newPost = {userId: currentUser._id, text: values.text, attachments: readyAttachments, location: values.location, tags: tags};
                createPost(newPost);
                setAttachments([]);
                setFiles([]);
                resetForm({values: {
                    text: '',
                    attachments: [],
                    location: '',
                    tags: '',
                }});
                setOpenLocation(false);
                setOpenTags(false);
            }}
        >
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <Form className={classes.share}>
                    <div className={classes.shareTop}>
                        <img src={currentUser.profilePicture ? currentUser.profilePicture : avatar} alt='' className={classes.shareAvatar}/>
                        <TextareaFeed placeholder={`What's in your mind, ${currentUser.username}?`} name='text' className={classes.shareTextarea}/>
                    </div>
                    <div className={classes.shareBottom}>
                        <div className={classes.shareOptions}>
                            <div className={classes.option} onClick={()=>fileRef.current.click()}>
                                <PermMedia className={classes.optionIcon}/>
                                <span className={classes.optionText}>Media</span>
                            </div>
                            <div className={classes.option} onClick={setTagsVisibility}>
                                <Label className={classes.optionIcon}/>
                                <span className={classes.optionText}>Tags</span>
                            </div>
                            <div className={classes.option} onClick={setLocationVisibility}>
                                <Room className={classes.optionIcon}/>
                                <span className={classes.optionText}>Location</span>
                            </div>
                        </div>
                        <button type='submit' className={classes.button}>Share</button>
                    </div>
                    <div className={classes.shareAdditional}>
                        <HidableField isVisible={openLocation} caption='Set your location for this post' name='location' type='text' placeholder='Your current location...'/>
                        <HidableField isVisible={openTags} caption='Set some tags for this post' name='tags' type='text' placeholder='Tags...' />
                        <ManualLoadFileInput currentUser={currentUser} token={token} files={files} setFiles={setFiles} fileRef={fileRef} readyFiles={attachments} setReadyFiles={setAttachments} multiple={true}/>
                    </div>
                </Form>
            </div>
        </Formik>
    );
};

export default ShareForm;