import { Search } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import React from 'react';
import SimpleField from '../SimpleField/SimpleField';
import classes from './SimpleSearchForm.module.scss';

const SimpleSearchForm = ({query, setQueryMethod}) => {
    const isDark = document.body.classList.contains('dark');
    
    return (
        <Formik
            initialValues={{
                searchQuery: query ? query : '',
            }}
            onSubmit = {async (values) => {
                setQueryMethod(values.searchQuery);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <SimpleField name='searchQuery' type='text' placeholder='Search...'/>
                <button type='submit' className={classes.button}><Search className={classes.icon}/></button>
            </Form>
        </Formik>
    );
};

export default SimpleSearchForm;