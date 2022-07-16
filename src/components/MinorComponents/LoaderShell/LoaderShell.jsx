import React, { useCallback, useEffect } from 'react';

const LoaderShell = ({children, getResults, isFetching, page, more, elementId}) => {
    const isBottom = (element) => {
        return element.getBoundingClientRect().bottom < window.innerHeight;
    }

    const trackScrolling = useCallback(() => {
        const element = document.getElementById(elementId);
        if(isBottom(element) && !isFetching && more){
            getResults(++page);
        }
    }, [getResults, isFetching, page, more]);

    useEffect(() => {
        if(more) document.addEventListener('scroll', trackScrolling);
        return () => { document.removeEventListener('scroll', trackScrolling) };
    }, [more, trackScrolling])

    return (
        <div style={{width: '100%'}}>
            {children}
        </div>
    )
};

export default LoaderShell;