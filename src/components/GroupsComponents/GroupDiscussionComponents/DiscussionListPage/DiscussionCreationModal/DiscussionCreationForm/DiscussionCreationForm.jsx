import React, { useState } from 'react';
import classes from './DiscussionCreationForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import SimpleButton from '../../../../../MinorComponents/SimpleButton/SimpleButton';
import ValidationTextarea from '../../../../../MinorComponents/ValidationTextarea/ValidationTextarea';
import DropdownMenu from '../../../../../MinorComponents/DropdownMenu/DropdownMenu';
import ValidationField from '../../../../../MinorComponents/ValidationField/ValidationField';

const DiscussionCreationForm = ({currentUser, addMethod, cancelMethod}) => {
    const [isPrivate, setIsPrivate] = useState(false);
    const isPrivateValues=[{value: false, caption: 'Visible for everyone'}, {value: true, caption: 'Visible only for group members'}];
    const isDark = document.body.classList.contains('dark');

    const validation = Yup.object({
        discussionName: Yup.string().required('Discussion name is required'),
        postText: Yup.string().required('Discussion name is required'),
    })

    return (
        <Formik
            initialValues={{
                discussionName: '',
                postText: '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                const discussionData = {discussionName: values.discussionName, userId: currentUser._id, postText: values.postText, isPrivate: isPrivate};
                addMethod(discussionData);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <span className={classes.warning}>Note: Fields marked with * are required.</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Discussion name <span className={classes.warning}>*</span></h5>
                        <ValidationField name='discussionName' type='text' placeholder='Discussion Name...' />
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Visibility mode</h5>
                        <span className={classes.inputCaption}>Choose visibility mode for new discussion.</span>
                        <DropdownMenu name='isPrivate' current={isPrivate} setCurrent={setIsPrivate} values={isPrivateValues}/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>First post <span className={classes.warning}>*</span></h5>
                        <ValidationTextarea name='postText' placeholder='Post text...'/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit'>Create Discussion</SimpleButton> 
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default DiscussionCreationForm;