import {LoadInfo} from "../api/schedule-backend-api";

export const generateNewWeekPeriodDateMilliseconds = (dateMilliseconds: number, direction: 1 | -1) => {
    return dateMilliseconds + 7 * 24 * 60 * 60 * 1000 * direction
}

export const generateStartDateMilliseconds = (today?: Date): number => {
    !today && (today = new Date())
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    const firstDayOfWeek = today.getDate() - (today.getDay() === 0 ? 7 : today.getDay()) + 1

    return today.setDate(firstDayOfWeek)
}

export const generateEndDateMilliseconds = (today?: Date): number => {
    !today && (today = new Date())
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    today.setHours(0)

    const lastDayOfWeek = today.getDate() + (today.getDay() === 0 ? 0 : 7 - today.getDay())

    return today.setDate(lastDayOfWeek)
}

export const switchByDayNumber = (value: number | undefined): string => {
    switch (value) {
        case 0:
            return 'Понедельник';
        case 1:
            return 'Вторник';
        case 2:
            return 'Среда';
        case 3:
            return 'Четверг';
        case 4:
            return 'Пятница';
        case 5:
            return 'Суббота';
        case 6:
            return 'Воскресенье';
        default:
            return 'Not Found';
    }
};

export const switchByLessonNumber = (value: number | undefined): string => {
    switch (value) {
        case 1:
            return '08.00-09.35';
        case 2:
            return '09.50-11.25';
        case 3:
            return '11.40-13.15';
        case 4:
            return '14.00-15.35';
        case 5:
            return '15.45-17.20';
        case 6:
            return '17.30-19.05';
        case 7:
            return '19.15-20.50';
        default:
            return 'Not Found';
    }
};

export const _switchByDayNumber = (stringDate: string) => {
    const date = new Date(stringDate).getDay()
    return switchByDayNumber(date === 0 ? 6 : date - 1)
}

export const mergeDayOfWeekRowsNumber219 = (schedule: Array<LoadInfo>, date: string) => {
    let count = 0
    schedule.forEach(value => {
        if (value?.date === date)
            count++
    })
    return count
}