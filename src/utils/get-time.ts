export const getTime = (minutes?: number, isShort?: boolean) => {
    const workHours = minutes ? Math.round((minutes / 60) / 60) : 0;
    const workMinutes = minutes ? Math.round((minutes / 60) % 60) : 0;
    const hoursLabel = isShort ? 'ч' : 'часов'; 
    const minutesLabel = isShort ? 'м' : 'минут'; 
    return `${workHours || ''}${workHours ? ' ' + hoursLabel : ''} ${workMinutes || ''}${workMinutes ? ' ' + minutesLabel : ''}`; 
}
