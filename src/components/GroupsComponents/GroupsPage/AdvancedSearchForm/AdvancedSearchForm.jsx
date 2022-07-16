import React, { useState } from 'react';
import classes from './AdvancedSearchForm.module.scss';
import { Form, Formik } from 'formik';
import SimpleField from '../../../MinorComponents/SimpleField/SimpleField';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';

const AdvancedSearchForm = ({isDark, searchQuery, setQuery, reset, resetQueryAdvancedParams}) => {
    const [theme, setTheme] = useState(searchQuery.theme);
    const themeValues = [{value: '', caption: 'Theme...'}, {value: 'Internet', caption: 'Internet'}, {value: 'Fashion', caption: 'Fashion'}, 
    {value: 'Media', caption: 'Media'}, {value: 'Travelling', caption: 'Travelling'}, {value: 'Hobbies', caption: 'Hobbies'}, {value: 'Tech', caption: 'Tech'}, {value: 'Nature', caption: 'Nature'}, {value: 'Health & Beauty', caption: 'Health & Beauty'}, {value: 'Religion', caption: 'Religion'}, {value: 'Science', caption: 'Science'}, {value: 'History', caption: 'History'}, {value: 'Business', caption: 'Business'}, {value: 'Military', caption: 'Military'}, {value: 'Art', caption: 'Art'}, {value: 'Sport', caption: 'Sport'}, {value: 'Literature', caption: 'Literature'}, {value: 'Movies', caption: 'Movies'}, {value: 'Comics & Animation', caption: 'Comics & Animation'}, {value: 'Games', caption: 'Games'}, {value: 'News', caption: 'News'}, {value: 'Officials', caption: 'Officials'}, {value: 'Leisure & Entertainment', caption: 'Leisure & Entertainment'}, {value: 'Humor', caption: 'Humor'}, {value: 'Adult', caption: 'Adult'}, {value: 'Other', caption: 'Other'}];

    const handleAdvancedQueryParamsReset = () => {
        resetQueryAdvancedParams();
    }

    return (
        <Formik
            initialValues = {{
                groupCity: searchQuery.groupCity,
                groupCountry: searchQuery.groupCountry,
            }}
            onSubmit = {async (values) => {
                reset();
                const query = {...searchQuery};
                query.groupCity = values.groupCity;
                query.groupCountry = values.groupCountry;
                query.theme = theme;
                setQuery(query);
            }}>
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.content}>
                    <h3 className={classes.header}>Advanced search options</h3>
                    <Form className={classes.form}>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>City</h5>
                            <SimpleField name='groupCity' type='text' placeholder='City...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Country</h5>
                            <SimpleField name='groupCountry' type='text' placeholder='Country...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Theme</h5>
                            <DropdownMenu name='theme' current={theme} setCurrent={setTheme} values={themeValues}/>
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