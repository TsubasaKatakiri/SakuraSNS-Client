import React, { useState } from 'react';
import classes from './UserAdditionalInfoSettings.module.scss';
import {Formik, Form} from 'formik';
import SimpleField from '../../../MinorComponents/SimpleField/SimpleField';
import SimpleTextarea from '../../../MinorComponents/SimpleTextarea/SimpleTextarea';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';

const UserAdditionalInfoSettings = ({profile, currentUser, token, changeExtraData}) => {
    const [gender, setGender] = useState(profile.extraData ? profile.extraData.gender : '');
    const genderValues=[{value: '', caption: 'My gender...'}, {value: 'Male', caption: 'Male'}, {value: 'Female', caption: 'Female'}, 
    {value: 'Non-Binary', caption: 'Non-Binary'}, {value: 'Not Specified', caption: 'Not Specified'}];
    const [currentStatus, setCurrentStatus] = useState(profile.extraData ? profile.extraData.currentStatus : '');
    const currentStatusValues=[{value: '', caption: 'My current status...'}, {value: 'Single', caption: 'Single'}, {value: 'Married', caption: 'Married'}, 
    {value: 'Not Specified', caption: 'Not Specified'}];
    const isDark = currentUser.userSettings.isDarkMode;

    return (
        <Formik
            initialValues={{
                city: profile.extraData.city,
                country: profile.extraData.country,
                school: profile.extraData.school,
                university: profile.extraData.university,
                company: profile.extraData.company,
                gender: profile.extraData.gender,
                currentStatus: profile.extraData.currentStatus,
                aboutMe: profile.extraData.aboutMe,
                hobbies: profile.extraData.hobbies,
                likes: profile.extraData.likes,
                dislikes: profile.extraData.dislikes,
            }}
            onSubmit = {async (values) => {
                const data = {id: profile._id, city: values.city, country: values.country, school: values.school, university: values.university,
                              gender: gender, currentStatus: currentStatus, aboutMe: values.aboutMe, hobbies: values.hobbies,
                              likes: values.likes, dislikes: values.dislikes, company: values.company};
                changeExtraData(currentUser._id, data, token);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.group}>
                    <h5 className={classes.groupHeader}>Location</h5>
                    <span className={classes.groupCaption}>Where you are from?</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>City</h5>
                        <SimpleField name='city' type='text' placeholder='City...'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Country</h5>
                        <SimpleField name='country' type='text' placeholder='Country...'/>
                    </div>
                </div>
                <div className={classes.group}>
                    <h5 className={classes.groupHeader}>Education</h5>
                    <span className={classes.groupCaption}>Where you are studied/study now?</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>School</h5>
                        <SimpleField name='school' type='text' placeholder='School...'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>University</h5>
                        <SimpleField name='university' type='text' placeholder='University...'/>
                    </div>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Company</h5>
                    <span className={classes.inputCaption}>Your current workplace</span>
                    <SimpleField name='company' type='text' placeholder='My current workplace...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Gender</h5>
                    <span className={classes.inputCaption}>Your gender</span>
                    <DropdownMenu name='gender' current={gender} setCurrent={setGender} values={genderValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Status</h5>
                    <span className={classes.inputCaption}>Your current status: single, married or not specified</span>
                    <DropdownMenu name='currentStatus' current={currentStatus} setCurrent={setCurrentStatus} values={currentStatusValues} />
                </div>
                <div className={classes.group}>
                    <h5 className={classes.groupHeader}>About</h5>
                    <span className={classes.groupCaption}>Show everyone who are you!</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>About me</h5>
                        <SimpleTextarea name='aboutMe' placeholder='About me...'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Hobbies</h5>
                        <SimpleTextarea name='hobbies' placeholder='My hobbies...'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>What/who I like/love</h5>
                        <SimpleTextarea name='likes' placeholder='What I like...'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>What/who I dislike/hate</h5>
                        <SimpleTextarea name='dislikes' placeholder='What I dislike...'/>
                    </div>
                </div>
                <SimpleButton type='submit'>Save information</SimpleButton>
            </Form>
        </Formik>
    );
};

export default UserAdditionalInfoSettings;