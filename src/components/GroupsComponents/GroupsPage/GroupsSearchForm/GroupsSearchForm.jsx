import React from 'react';
import {Formik, Form} from 'formik';
import classes from './GroupsSearchForm.module.scss';
import { Search } from '@material-ui/icons';
import SimpleField from '../../../MinorComponents/SimpleField/SimpleField';

const GroupsSearchForm = ({isDark, searchQuery, setQuery, resetResults}) => {
    return (
        <Formik
            initialValues={{
                groupname: searchQuery.groupname,
            }}
            onSubmit = {async (values) => {
                resetResults();
                const query = {...searchQuery};
                query.groupname = values.groupname;
                setQuery(query);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <SimpleField name='groupname' type='text' placeholder='Search for groups...'/>
                <button type='submit' className={classes.button}><Search className={classes.icon}/></button>
            </Form>
        </Formik>
    );
};

export default GroupsSearchForm;