import React, { useRef, useState } from 'react';
import classes from './GroupCreationForm.module.scss';
import {Formik, Form} from "formik";
import avatar from '../../../../images/noAvatar.png';
import blankCover from '../../../../images/noCoverPicture.png';
import * as Yup from 'yup';
import ValidationField from './../../../MinorComponents/ValidationField/ValidationField';
import SimpleField from './../../../MinorComponents/SimpleField/SimpleField';
import SimpleTextarea from '../../../MinorComponents/SimpleTextarea/SimpleTextarea';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';
import { GroupAPI } from '../../../../api/GroupApi';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';
import AutoloaderInput from '../../../MinorComponents/AutoloaderInput/AutoloaderInput';


const GroupCreationForm = ({currentUser, token}) => {
    const [theme, setTheme] = useState('');
    const themeValues = [{value: '', caption: 'Theme...'}, {value: 'Internet', caption: 'Internet'}, {value: 'Fashion', caption: 'Fashion'}, 
    {value: 'Media', caption: 'Media'}, {value: 'Travelling', caption: 'Travelling'}, {value: 'Hobbies', caption: 'Hobbies'}, {value: 'Tech', caption: 'Tech'}, {value: 'Nature', caption: 'Nature'}, {value: 'Health & Beauty', caption: 'Health & Beauty'}, {value: 'Religion', caption: 'Religion'}, {value: 'Science', caption: 'Science'}, {value: 'History', caption: 'History'}, {value: 'Business', caption: 'Business'}, {value: 'Military', caption: 'Military'}, {value: 'Art', caption: 'Art'}, {value: 'Sport', caption: 'Sport'}, {value: 'Literature', caption: 'Literature'}, {value: 'Movies', caption: 'Movies'}, {value: 'Comics & Animation', caption: 'Comics & Animation'}, {value: 'Games', caption: 'Games'}, {value: 'News', caption: 'News'}, {value: 'Officials', caption: 'Officials'}, {value: 'Leisure & Entertainment', caption: 'Leisure & Entertainment'}, {value: 'Humor', caption: 'Humor'}, {value: 'Adult', caption: 'Adult'}, {value: 'Other', caption: 'Other'}];
    const [isPrivate, setIsPrivate] = useState(false);
    const isPrivateValues = [{value: false, caption: 'Content is visible for everyone'}, {value: true, caption: 'Content is visible only to members'}];
    const [isFreeJoin, setIsFreeJoin] = useState(true);
    const isFreeJoinValues = [{value: true, caption: 'Everyone can freely join the group'}, {value: false, caption: 'Group joining is controlled'}];
    const [downloadAvatarUrl, setDownloadAvatarUrl] = useState('');
    const [downloadCoverUrl, setDownloadCoverUrl] = useState('');
    const fileAvatarRef = useRef();
    const fileCoverRef = useRef();

    const resetCurrentAvatar = () => {
        setDownloadAvatarUrl('');
    }

    const resetCurrentCover = () => {
        setDownloadCoverUrl('');
    }

    const validation = Yup.object({
        groupname: Yup.string().required('User name is required').max(256, 'User name cannot be longer than 256 chars'),
    })

    return (
        <Formik
        initialValues={{
            groupname: '',
            theme: '',
            description: '',
            groupCity: '',
            groupCountry: '',
        }}
        validationSchema = {validation}
        onSubmit = {async (values, {resetForm}) => {
            try{
                const groupData = {creator: currentUser._id, groupname: values.groupname, profilePicture: downloadAvatarUrl, coverPicture: downloadCoverUrl, theme: theme, description: values.description, groupCity: values.groupCity, groupCountry: values.groupCountry, isPrivate: isPrivate === 'false' ? false : true, isFreeJoin: isFreeJoin === 'false' ? false : true};
                console.log(groupData);
                const res = await GroupAPI.createGroup(groupData, token);
                console.log(res);
                resetForm({values: {
                    groupname: '',
                    theme: '',
                    description: '',
                    groupCity: '',
                    groupCountry: '',
                }});
                setTheme('');
                setIsPrivate(false);
                setIsFreeJoin(true);
                setDownloadAvatarUrl('');
                setDownloadCoverUrl('');
            }catch(e){}
        }}
        >
            <Form className={classes.wrapper}>
                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Name <span className={classes.warning}>*</span></h5>
                    <span className={classes.inputCaption}>Group name will be shown to all users.</span>
                    <ValidationField name='groupname' type='text' placeholder='Group Name...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Avatar</h5>
                    <div className={classes.imageInput}>
                        <div className={classes.image}>
                            <img src={downloadAvatarUrl ? downloadAvatarUrl : avatar} className={classes.imagePreview} alt=''/>
                        </div>
                        <div className={classes.controls}>
                            <SimpleButton type='button' onClick={() => fileAvatarRef.current.click()}>Upload Avatar</SimpleButton>
                            <SimpleButton type='button' onClick={() => resetCurrentAvatar()}>Reset Avatar</SimpleButton>
                            <AutoloaderInput setDownloadUrl={setDownloadAvatarUrl} fileRef={fileAvatarRef} type='image'/>
                        </div>
                    </div>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Cover Picture</h5>
                    <div className={classes.imageInput}>
                        <div className={classes.imageContainer}>
                            <img src={downloadCoverUrl ? downloadCoverUrl : blankCover} className={`${classes.imagePreview} ${classes.wide}`} alt=''/>
                        </div>
                        <div className={classes.controls}>
                            <SimpleButton type='button' className={classes.button} onClick={()=>fileCoverRef.current.click()}>Upload Cover</SimpleButton>
                            <SimpleButton type='button' className={classes.button} onClick={()=>resetCurrentCover()}>Reset Cover</SimpleButton>
                            <AutoloaderInput setDownloadUrl={setDownloadCoverUrl} fileRef={fileCoverRef} type='image'/>
                        </div>
                    </div>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Theme</h5>
                    <span className={classes.inputCaption}>Choosing group theme will make finding your group easier.</span>
                    <DropdownMenu name='theme' current={theme} setCurrent={setTheme} values={themeValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>User Description</h5>
                    <span className={classes.inputCaption}>Leave a description about your group.</span>
                    <SimpleTextarea name='description' placeholder='Group Description'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group City</h5>
                    <span className={classes.inputCaption}>Set city where your group located.</span>
                    <SimpleField name='groupCity' type='text' placeholder='Group City...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Country</h5>
                    <span className={classes.inputCaption}>Set country where your group located.</span>
                    <SimpleField name='groupCountry' type='text' placeholder='Group Country...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Privacy</h5>
                    <span className={classes.inputCaption}>Choose whether to make group content visible for everyone, or only for the members.</span>
                    <DropdownMenu name='isPrivate' current={isPrivate} setCurrent={setIsPrivate} values={isPrivateValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Joining</h5>
                    <span className={classes.inputCaption}>Choose whether to make group join free for everyone, or control join to your group through the join requests.</span>
                    <DropdownMenu name='isFreeJoin' current={isFreeJoin} setCurrent={setIsFreeJoin} values={isFreeJoinValues}/>
                </div>
                <div className={classes.controlsHorizontal}>
                    <SimpleButton type='submit'>Create Group</SimpleButton>
                    <SimpleButton type='button'>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default GroupCreationForm;