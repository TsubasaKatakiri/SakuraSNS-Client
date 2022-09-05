import React from 'react';
import classes from './DropdownMenu.module.scss';

const DropdownMenu = ({current, setCurrent, name, values, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const handleChange = (e) => {
        setCurrent(e.target.value);
    }

    return (
        <select name={name} value={current} onChange={handleChange} {...props} className={`${classes.selectStyle} ${isDark ? classes.night : ''}`}>
            {values.map((v, i) => {
                return <option value={v.value} className={classes.optionStyle} key={i}>{v.caption}</option>
            })}
        </select>
    );
};

export default DropdownMenu;