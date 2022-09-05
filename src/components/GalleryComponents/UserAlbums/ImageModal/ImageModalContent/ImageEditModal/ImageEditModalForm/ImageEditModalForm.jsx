import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import DropdownMenu from '../../../../../../MinorComponents/DropdownMenu/DropdownMenu';
import SimpleField from '../../../../../../MinorComponents/SimpleField/SimpleField';
import classes from './ImageEditModalForm.module.scss';
import SimpleButton from '../../../../../../MinorComponents/SimpleButton/SimpleButton';

const ImageEditModalForm = ({currentUser, group, currentAlbum, albumList, image, updateMethod, cancelMethod}) => {
    const isDark = document.body.classList.contains('dark');
    const [album, setAlbum] = useState(currentAlbum._id);
    const availableAlbums = group ? albumList.filter(a=>a.albumSettings.isGroupLocked === false) : albumList;
    const albumValues = availableAlbums.map(a => {
        return {value: a._id, caption: a.name}
    });

    return (
        <Formik
            initialValues={{
                name: image.name,
            }}
            onSubmit = {async (values) => {
                const imageData = {name: values.name, album: album, userId: currentUser._id};
                updateMethod(imageData);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Image name</h5>
                        <SimpleField name='name' type='text' placeholder='Shortly describe your photo...'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Album</h5>
                        <DropdownMenu name='album' current={album} setCurrent={setAlbum} values={albumValues}/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit'>Update image</SimpleButton>
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>        
            </Form>
        </Formik>
    );
};

export default ImageEditModalForm;