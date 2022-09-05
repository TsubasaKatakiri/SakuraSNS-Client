import React from 'react';
import classes from './Paginator.module.css';

const Paginator = ({page, totalPages, onPageChanged}) => {
    const pageNumbers = [];

    for (let i=1; i<=totalPages; i++){
        pageNumbers.push(i);
    }

    return (
        <div className={classes.wrapper}>
            Pages: 
            {page > 1 ? <span className={classes.paginatorItem} onClick={()=>onPageChanged(1)}>&lt;&lt;</span>: ''}
            {page > 1 ? <span className={classes.paginatorItem} onClick={()=>onPageChanged(page-1)}>&lt;</span>: ''}
            {pageNumbers.map(number => {
                return (
                    <span className={`${classes.paginatorItem} ${+page === +number ? classes.active : ''}`} key={number} onClick={()=>onPageChanged(number)}>
                        {number}
                    </span>
                )
            })}
            {page < totalPages ? <span className={classes.paginatorItem} onClick={()=>onPageChanged(page+1)}>&gt;</span>: ''}
            {page < totalPages ? <span className={classes.paginatorItem} onClick={()=>onPageChanged(totalPages)}>&gt;&gt;</span>: ''}
        </div>
    );
};

export default Paginator;