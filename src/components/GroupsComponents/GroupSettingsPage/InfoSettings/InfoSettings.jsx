import React, { useRef, useState } from 'react';
import classes from './InfoSettings.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationField from '../../../MinorComponents/ValidationField/ValidationField';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';
import SimpleTextarea from '../../../MinorComponents/SimpleTextarea/SimpleTextarea';
import SimpleField from '../../../MinorComponents/SimpleField/SimpleField';
import avatar from '../../../../images/noAvatar.png';
import blankCover from '../../../../images/noCoverPicture.png';
import { checkPolicy, getAllowedRoles } from '../../../../util/CheckPolicy';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';
import AutoloaderInput from '../../../MinorComponents/AutoloaderInput/AutoloaderInput';

const InfoSettings = ({currentUser, token, group, updateGroupInfo}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canEditGroupInfo);
    const allowedRoles = getAllowedRoles(group.policies.canEditGroupInfo);

    const [theme, setTheme] = useState(group.theme);
    const themeValues = [{value: '', caption: 'Theme...'}, {value: 'Internet', caption: 'Internet'}, {value: 'Fashion', caption: 'Fashion'}, 
    {value: 'Media', caption: 'Media'}, {value: 'Travelling', caption: 'Travelling'}, {value: 'Hobbies', caption: 'Hobbies'}, {value: 'Tech', caption: 'Tech'}, {value: 'Nature', caption: 'Nature'}, {value: 'Health & Beauty', caption: 'Health & Beauty'}, {value: 'Religion', caption: 'Religion'}, {value: 'Science', caption: 'Science'}, {value: 'History', caption: 'History'}, {value: 'Business', caption: 'Business'}, {value: 'Military', caption: 'Military'}, {value: 'Art', caption: 'Art'}, {value: 'Sport', caption: 'Sport'}, {value: 'Literature', caption: 'Literature'}, {value: 'Movies', caption: 'Movies'}, {value: 'Comics & Animation', caption: 'Comics & Animation'}, {value: 'Games', caption: 'Games'}, {value: 'News', caption: 'News'}, {value: 'Officials', caption: 'Officials'}, {value: 'Leisure & Entertainment', caption: 'Leisure & Entertainment'}, {value: 'Humor', caption: 'Humor'}, {value: 'Adult', caption: 'Adult'}, {value: 'Other', caption: 'Other'}];
    const [downloadAvatarUrl, setDownloadAvatarUrl] = useState(group.profilePicture);
    const [downloadCoverUrl, setDownloadCoverUrl] = useState(group.coverPicture);
    const fileAvatarRef = useRef();
    const fileCoverRef = useRef();

    const validation = Yup.object({
        groupname: Yup.string().required('Group name is required').max(256, 'Group name cannot be longer than 256 chars'),
    })

    const resetCurrentAvatar = () => {
        setDownloadAvatarUrl('');
    }

    const resetCurrentCover = () => {
        setDownloadCoverUrl('');
    }

    return (
        <Formik
        initialValues={{
            groupname: group.groupname,
            description: group.description,
            groupCity: group.groupCity,
            groupCountry: group.groupCountry,
        }}
        validationSchema = {validation}
        onSubmit = {async (values) => {
            const groupData = {userId: currentUser._id, groupname: values.groupname, profilePicture: downloadAvatarUrl, coverPicture: downloadCoverUrl, theme: theme, description: values.description, groupCity: values.groupCity, groupCountry: values.groupCountry};
            console.log(groupData);
            updateGroupInfo(group._id, groupData, token);
        }}
        >
            <Form className={classes.wrapper}>
                {!isAllowed ? <span className={classes.warningMessage}>Access forbidden: Only group {allowedRoles} can change these settings.</span> : ''}
                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                <div className={classes.inputBlock}>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group Name <span className={classes.warning}>*</span></h5>
                        <span className={classes.inputCaption}>Group name will be shown to all users.</span>
                        <ValidationField name='groupname' type='text' placeholder='Group Name...' disabled={!isAllowed}/>
                    </div>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Avatar</h5>
                    <div className={classes.imageInput}>
                        <div className={classes.image}>
                            <h5 className={classes.imageCaption}>Current group avatar</h5>
                            <img src={downloadAvatarUrl ? downloadAvatarUrl : group.profilePicture ? group.profilePicture : avatar} className={classes.imagePreview} alt=''/>
                        </div>
                        <div className={classes.controls}>
                            <SimpleButton type='button' onClick={()=>fileAvatarRef.current.click()} disabled={!isAllowed}>Upload Avatar</SimpleButton>
                            <SimpleButton type='button' onClick={()=>resetCurrentAvatar()} disabled={!downloadAvatarUrl || !isAllowed}>Reset Avatar</SimpleButton>
                            <AutoloaderInput setDownloadUrl={setDownloadAvatarUrl} fileRef={fileAvatarRef} type='image'/>
                        </div>
                    </div>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Cover Picture</h5>
                    <div className={classes.imageInput}>
                        <div className={classes.image}>
                            <h5 className={classes.imageCaption}>Current group cover</h5>
                            <img src={downloadCoverUrl ? downloadCoverUrl : group.coverPicture ? group.coverPicture : blankCover} className={`${classes.imagePreview} ${classes.wide}`} alt=''/>
                        </div>
                        <div className={classes.controls}>
                            <SimpleButton type='button' onClick={()=>fileCoverRef.current.click()} disabled={!isAllowed}>Upload Cover</SimpleButton>
                            <SimpleButton type='button' onClick={()=>resetCurrentCover()} disabled={!downloadCoverUrl || !isAllowed}>Reset Cover</SimpleButton>
                            <AutoloaderInput setDownloadUrl={setDownloadCoverUrl} fileRef={fileCoverRef} type='image'/>
                        </div>
                    </div>
                </div>
                <div className={classes.inputBlock}>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group Theme</h5>
                        <span className={classes.inputCaption}>Choosing group theme will make finding your group easier.</span>
                        <DropdownMenu name='theme' disabled={!isAllowed} current={theme} setCurrent={setTheme} values={themeValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group Description</h5>
                        <span className={classes.inputCaption}>Leave a description about your group.</span>
                        <SimpleTextarea name='description' placeholder='Group Description' disabled={!isAllowed}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group City</h5>
                        <span className={classes.inputCaption}>Set city where your group located.</span>
                        <SimpleField name='groupCity' type='text' placeholder='Group City...' disabled={!isAllowed}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Group Country</h5>
                        <span className={classes.inputCaption}>Set country where your group located.</span>
                        <SimpleField name='groupCountry' type='text' placeholder='Group Country...'  disabled={!isAllowed}/>
                    </div>
                </div>
                <SimpleButton type='submit' disabled={!isAllowed}>Apply info</SimpleButton>
            </Form>
        </Formik>
    );
};

export default InfoSettings;