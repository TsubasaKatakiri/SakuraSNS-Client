import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { useState } from 'react';
import Carousel from './Carousel/Carousel';
import classes from './Slider.module.css';


const Slider = ({sliderContent}) => {
    if(sliderContent.length === 0) return "";
    
    return(
        <Carousel>
            {sliderContent.map((element, index) => {
                if(element.type === "image"){
                    return (
                        <div className={classes.item} key={index}>
                            <img className={classes.image} src={element.file} alt="image" id={`item${index}`}/>
                        </div>
                    )
                } else if (element.type === "video"){
                    return (
                        <div className={classes.item} key={index}>
                            <video className={classes.video} src={element.file} controls id={`item${index}`}/>
                        </div>
                    )
                }
            })}
        </Carousel>
    )
};

export default Slider;