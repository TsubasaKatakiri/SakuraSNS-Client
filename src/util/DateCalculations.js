export const calculateCurrentDateDifference = (datetime) => {
    const date1 = new Date();
    const date2 = new Date(datetime);
    return Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) / (1000 * 60 *60 *24));
}

export const dateFormat = (date) => {
    return new Date(date).toISOString().split('T')[0];
}

export const dateZeroing = (datetime) => {
    let date; 
    if(datetime) date = new Date(datetime.split('T')[0]);
    else date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setFullYear(0);
    return date;
} 

export const convertTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec - (minutes * 60));
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
}