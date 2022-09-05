import React, { Children, cloneElement, useEffect, useState } from 'react';
import classes from './Carousel.module.css';
import { ChevronLeft,  ChevronRight } from '@material-ui/icons';

const Carousel = ({children}) => {
    const [slides, setSlides] = useState([]);
    const [offset, setOffset] = useState(0);
    let sliderLength = children.length;
    const SLIDE_WIDTH=100/sliderLength;

    const goPreviousSlide = () => {
        setOffset(offset < 0 ? offset + SLIDE_WIDTH : -100+SLIDE_WIDTH)
    }

    const goNextSlide = () => {
        setOffset(offset > -100+SLIDE_WIDTH ? offset - SLIDE_WIDTH : 0)
    }

    useEffect(()=>{
        setSlides(Children.map((children, child) => {
            return cloneElement(child, {style: {height: '100%', minWidth: '100%', maxWidth: '100%'}})
        }))
    }, [])

    return (
        <div className={classes.mainContainer}>
            {sliderLength > 1 ? <ChevronLeft onClick={goPreviousSlide} className = {`${classes.sliderControl} ${classes.left}`}/> : ''}
            <div className={classes.window}>
                <div className={classes.itemsContainer} style={{width: `${sliderLength*100}%`, transform: `translateX(${offset}%)`}}>
                    {children}
                </div>
            </div>
            {sliderLength > 1 ? <ChevronRight onClick={goNextSlide} className = {`${classes.sliderControl} ${classes.right}`}/> : ''}
        </div>
    );
};

export default Carousel;