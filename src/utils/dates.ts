export const generateRequestParamWeekPeriodByDate = (date: Date) => {
    const firstDayOfWeek = date.getDate() - (date.getDay() === 0 ? 7 : date.getDay()) + 1;
    const firstDayOfWeekDate = new Date(new Date(date).setDate(firstDayOfWeek));
    const firstDayOfWeekString = `${firstDayOfWeekDate.getFullYear()}-${(firstDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

    const lastDayOfWeek = firstDayOfWeekDate.getDate() + 6;
    const lastDayOfWeekDate = new Date(firstDayOfWeekDate.setDate(lastDayOfWeek));
    const lastDayOfWeekString = `${lastDayOfWeekDate.getFullYear()}-${(lastDayOfWeekDate.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfWeekDate.getDate().toString().padStart(2, '0')}`;

    return `startDate=${firstDayOfWeekString}&endDate=${lastDayOfWeekString}`
}

export const generateCurrentStartDateMilliseconds = (): number => {
    const today = new Date()
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    const firstDayOfWeek = today.getDate() - (today.getDay() === 0 ? 7 : today.getDay()) + 1

    return today.setDate(firstDayOfWeek)
}

export const generateCurrentEndDateMilliseconds = (): number => {
    const today = new Date();
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    const lastDayOfWeek = today.getDate() + (today.getDay() === 0 ? 0 : 7 - today.getDay())

    return today.setDate(lastDayOfWeek)
}