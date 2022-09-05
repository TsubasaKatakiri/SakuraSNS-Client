import React from 'react';
import classes from './ManagementSettings.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationField from '../../../MinorComponents/ValidationField/ValidationField';
import { GroupAPI } from '../../../../api/GroupApi';
import { useNavigate } from 'react-router-dom';
import { checkPolicy, getAllowedRoles } from '../../../../util/CheckPolicy';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';

const ManagementSettings = ({currentUser, token, group}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canDeleteGroup);
    const allowedRoles = getAllowedRoles(group.policies.canDeleteGroup);
    const navigate = useNavigate();
    const validation = Yup.object({
        groupname: Yup.string().required('Group name is required').max(256, 'Group name cannot be longer than 256 chars'),
    })

    return (
        <Formik
            initialValues={{
                groupname: '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                try {
                    const deletionData = {userId: currentUser._id, groupname: values.groupname};
                    console.log(deletionData);
                    await GroupAPI.deleteGroup(group._id, deletionData, token);
                    navigate('/groups');
                } catch (e) {}
            }}
        >
            <Form className={classes.wrapper}>
                <h4 className={classes.header}>Delete Group</h4>
                {!isAllowed ? <span className={classes.warning}>Access forbidden: Only group {allowedRoles} can perform this action.</span> : ""}
                <span className={classes.inputCaption}>You can delete the group here.</span>
                <span className={classes.inputCaption}>To perform group deletion, type the group name in the 'Group Name' field and click 'Delete group'.</span>
                <span className={classes.warning}>Warning! This operation cannot be undone!</span>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Group Name <span className={classes.warning}>*</span></h5>
                    <ValidationField name='groupname' disabled={!isAllowed} type='text' placeholder='Group Name...'/>
                </div>
                <SimpleButton type='submit' disabled={!isAllowed}>Delete group</SimpleButton>
            </Form>
        </Formik>
    );
};

export default ManagementSettings;