import React, { useState } from 'react';
import classes from './AdvancedSearchForm.module.scss';
import {Formik, Form} from 'formik';
import DropdownMenu from '../../MinorComponents/DropdownMenu/DropdownMenu';
import SimpleField from '../../MinorComponents/SimpleField/SimpleField';
import SimpleButton from '../../MinorComponents/SimpleButton/SimpleButton';

const AdvancedSearchForm = ({searchQuery, setSearchQuery, resetPeople, resetQueryAdvancedParams}) => {
    const [gender, setGender] = useState(searchQuery.gender);
    const genderValues=[{value: '', caption: 'My gender...'}, {value: 'Male', caption: 'Male'}, {value: 'Female', caption: 'Female'}, 
    {value: 'Non-Binary', caption: 'Non-Binary'}, {value: 'Not Specified', caption: 'Not Specified'}];
    const [currentStatus, setCurrentStatus] = useState(searchQuery.currentStatus);
    const currentStatusValues=[{value: '', caption: 'My current status...'}, {value: 'Single', caption: 'Single'}, {value: 'Married', caption: 'Married'}, 
    {value: 'Not Specified', caption: 'Not Specified'}];
    const isDark = document.body.classList.contains('dark');

    const handleAdvancedQueryParamsReset = () => {
        resetQueryAdvancedParams();
    }

    return (
        <Formik
            initialValues = {{
                city: searchQuery.city,
                country: searchQuery.country,
                school: searchQuery.school,
                university: searchQuery.university,
                company: searchQuery.company,
                gender: searchQuery.gender,
                currentStatus: searchQuery.currentStatus,
            }}
            onSubmit = {async (values) => {
                resetPeople();
                const query = {...searchQuery};
                query.city = values.city;
                query.country = values.country;
                query.school = values.school;
                query.university = values.university;
                query.company = values.company;
                query.gender = gender;
                query.currentStatus = currentStatus;
                setSearchQuery(query);
            }}>
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.content}>
                    <h3 className={classes.header}>Advanced search options</h3>
                    <Form className={classes.form}>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>City</h5>
                            <SimpleField name='city' type='text' placeholder='City...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Country</h5>
                            <SimpleField name='country' type='text' placeholder='Country...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>School</h5>
                            <SimpleField name='school' type='text' placeholder='School...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>University</h5>
                            <SimpleField name='university' type='text' placeholder='University...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Company</h5>
                            <SimpleField name='company' type='text' placeholder='Company...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Gender</h5>
                            <DropdownMenu name='gender' current={gender} setCurrent={setGender} values={genderValues}/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Status</h5>
                            <DropdownMenu name='currentStatus' current={currentStatus} setCurrent={setCurrentStatus} values={currentStatusValues}/>
                        </div>
                        <div className={classes.buttonBlock}>
                            <SimpleButton type='submit'>Search</SimpleButton>
                            <SimpleButton type='button' onClick={handleAdvancedQueryParamsReset}>Reset</SimpleButton>
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    );
};

export default AdvancedSearchForm;