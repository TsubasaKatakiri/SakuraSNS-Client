import React, { useState } from 'react';
import {Formik, Form} from 'formik';
import classes from './UserPromotionForm.module.scss';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';
import { checkPolicy } from '../../../../util/CheckPolicy';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';

const UserPromotionForm = ({currentUser, group, userLevel, levelUserId, handlePromote}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canUpdateUserLevels);
    const currentLevel = userLevel;
    const [level, setLevel] = useState(userLevel);
    const levelValues = [{value: 'administrator', caption: 'Administrator'}, {value: 'moderator', caption: 'Moderator'}, {value: 'member', caption: 'Member'}];

    return (
        <Formik
            initialValues={{}}
            onSubmit = {async () => {
                const levelingData = {userId: currentUser._id, levelUserId, newUserLevel: level, currentUserLevel: currentLevel};
                handlePromote(levelingData);
            }}
        >
            <Form className={classes.wrapper}>
                <DropdownMenu name='level' disabled={!isAllowed} current={level} setCurrent={setLevel} values={levelValues} />
                <SimpleButton type='submit' disabled={!isAllowed}>Promote</SimpleButton>
            </Form>
        </Formik>
    );
};

export default UserPromotionForm;