import React from 'react';
import classes from './PeopleSearchForm.module.scss';
import {Formik, Form} from 'formik';
import { Search } from '@material-ui/icons';
import SimpleField from '../../MinorComponents/SimpleField/SimpleField';

const PeopleSearchForm = ({searchQuery, setSearchQuery, resetPeople}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <Formik
            initialValues={{
                username: searchQuery.username,
            }}
            onSubmit = {async (values) => {
                resetPeople();
                const query = {...searchQuery};
                query.username = values.username;
                setSearchQuery(query);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <SimpleField name='username' type='text' placeholder='Search for users...'/>
                <button type='submit' className={classes.button}>
                    <Search className={classes.icon}/>
                </button>
            </Form>
        </Formik>
    );
};

export default PeopleSearchForm;