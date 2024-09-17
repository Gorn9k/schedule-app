export const generateNewWeekPeriodDateMilliseconds = (dateMilliseconds: number, direction: 1 | -1) => {
    return dateMilliseconds + 7 * 24 * 60 * 60 * 1000 * direction
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