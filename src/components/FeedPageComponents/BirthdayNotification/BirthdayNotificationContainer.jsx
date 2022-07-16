import React, { useEffect, useState } from 'react';
import { dateZeroing } from '../../../util/DateCalculations';
import BirthdayNotification from './BirthdayNotification';

const BirthdayNotificationContainer = ({currentUser}) => {
    const [birthdays, setBirthdays] = useState([]);

    useEffect(()=>{ 
        let today = dateZeroing();
        currentUser.followings.forEach(user => {
            let birthday = dateZeroing(user.birthdayDate);
            if(birthday.valueOf() === today.valueOf()) setBirthdays(currentValue => [...currentValue, user]);
        })
        return () => setBirthdays([]);
    }, [currentUser.followings]);

    if(!birthdays || birthdays.length === 0) return ''; 

    return <BirthdayNotification birthdays={birthdays}/>
};

export default BirthdayNotificationContainer;