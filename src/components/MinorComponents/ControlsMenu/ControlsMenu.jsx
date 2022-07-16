import { Delete, Edit, MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import classes from './ControlsMenu.module.css';
import { CSSTransition } from 'react-transition-group';

const ControlsMenu = ({user, currentUser, edit, remove}) => {
    const [menuOpened, setMenuOpened] = useState(false)

    const handleMenuVisibility = () => {
        setMenuOpened(!menuOpened);
    }

    const handleEdit = () => {
        setMenuOpened(!menuOpened);
        edit();
    }

    return (
        <>
            {user._id === currentUser._id 
                ? <>{menuOpened 
                    ? <div className={classes.menu}>
                            <div className={classes.buttonRow}>
                                <Edit className={classes.menuButton} onClick={handleEdit}/>
                                <Delete className={classes.menuButton} onClick={remove}/>
                            </div>
                        <MoreVert className={`${classes.menuButtonMain} ${classes.active}`} onClick={handleMenuVisibility}/>
                    </div> 
                    : <MoreVert className={classes.menuButtonMain} onClick={handleMenuVisibility}/>
                }</> 
                : ""
            }
        </>
    );
};

export default ControlsMenu;