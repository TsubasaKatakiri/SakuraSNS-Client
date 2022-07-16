import React from 'react';
import {useField} from "formik";

const TextareaFeed = (props) => {
    const [field] = useField(props);
    return (
        <textarea {...field} {...props}/>
    );
};

export default TextareaFeed;