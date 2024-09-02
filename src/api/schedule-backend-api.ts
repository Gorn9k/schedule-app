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

export type Schedule219 = {
    id: number
    day: number
    time: string
    type: string
    responsible: string
    description: string
}

export const getSchedule = async (startDate: string, endDate: string, frame: string): Promise<Schedule> => {
    const response =
        await axios.get<Schedule>(`${API_BASE_URL}/schedule?startDate=${startDate}&endDate=${endDate}&frame=${frame}`);
    return response.data;
};

export const getSchedule219 = async (startDate: string, endDate: string): Promise<Array<Schedule219>> => {
    const response =
        await axios.get<Array<Schedule219>>(`${API_BASE_URL}/class-room/number/219/loads-info/list?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};

export const getSchedule219LoadInfoById = async (id: string | undefined): Promise<Schedule219> => {
    const response =
        await axios.get<Schedule219>(`${API_BASE_URL}/class-room/number/219/load-info/${id}`);
    return response.data;
}