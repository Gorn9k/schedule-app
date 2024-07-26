import axios from 'axios';

const API_BASE_URL = 'http://localhost:8099';

export type Lesson = {
    id: number
    roomNumber: string;
    day: number;
    lessonNumber: number;
    frame: string;
    disciplineName: string;
    teacherFullName: string;
    group: string;
}

type DaySchedule = {
    [roomNumber: string]: Array<Lesson>;
}

export type DayAndLessonNumber = {
    day: number
    lessonNumber: number
}

export type Schedule = {
    [dayAndLessonNumberObject: string]: DaySchedule;
}

const getSchedule = async (startDate: string, endDate: string, frame: string): Promise<Schedule> => {
    const response =
        await axios.get<Schedule>(`${API_BASE_URL}/schedule?startDate=${startDate}&endDate=${endDate}&frame=${frame}`);
    return response.data;
};

export default getSchedule;