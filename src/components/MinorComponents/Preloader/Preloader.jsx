import React from 'react';
import classes from "./Preloader.module.css";
import spinner from "../../../images/Spinner.gif";

const Preloader = () => {
    return (
        <div className={classes.preloader}>
            <img src={spinner} alt="Loading..." />
        </div>
    );
};

export default Preloader;