import axios, {AxiosResponse} from 'axios';
import {number} from "yup";
import schedule from "../components/mainPage/schedule/Schedule";

const getCsrfToken = () => {
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return match ? match[2] : '';
};

const instance = axios.create({
    baseURL: 'http://localhost:8099'
});

// instance.interceptors.request.use(config => {
//     const csrfToken = getCsrfToken();
//     if (csrfToken && ['put', 'delete', 'post'].includes(config.method || '')) {
//         config.headers.set('X-XSRF-TOKEN', csrfToken)
//         console.log(config.headers.get('X-XSRF-TOKEN'));
//         config.data = {
//             ...config.data,  // Добавляем существующие данные
//             _csrf: csrfToken // Добавляем CSRF токен
//         };
//         console.log(config.data)
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

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
    date: string
    time: string
    type: string
    responsible: string
    description: string
}

export type Schedule219Payload = {
    id: number | undefined
    localDate: string | undefined
    localTime: string | undefined
    type: string | undefined
    responsible: string | undefined
    description: string | undefined
}

export const getSchedule = async (startDate: string, endDate: string, frame: string): Promise<Schedule> => {
    const response =
        await instance.get<Schedule>(`/schedule?startDate=${startDate}&endDate=${endDate}&frame=${frame}`);
    return response.data;
};

export const getSchedule219 = async (startDate: string, endDate: string): Promise<Array<Schedule219>> => {
    const response =
        await instance.get<Array<Schedule219>>(`/class-room/number/219/loads-info/list?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
};

export const getSchedule219LoadInfoById = async (id: string | undefined): Promise<Schedule219> => {
    const response =
        await instance.get<Schedule219>(`/class-room/number/219/load-info/${id}`);
    return response.data;
}

export const createSchedule219 = async (schedule: Schedule219Payload | null, authToken: string | null) => {
    return await instance.post(`/class-room/number/219/loads-info/create`, schedule, authToken ? {
        headers: {
            Authorization: `Basic ${authToken}`,
        }
    } : undefined);
}

export const editSchedule219 = async (schedule: Schedule219Payload | null, authToken: string | null): Promise<AxiosResponse<any, any>> => {
    return await instance.put(`/class-room/number/219/load-info/${schedule?.id}/edit`, schedule, authToken ? {
        headers: {
            Authorization: `Basic ${authToken}`,
        }
    } : undefined);
}

export const deleteSchedule219 = async (id: number | undefined, authToken: string | null): Promise<AxiosResponse<any, any>> => {
    return await instance.delete(`/class-room/number/219/load-info/${id}/delete`, authToken ? {
        headers: {
            Authorization: `Basic ${authToken}`,
        }
    } : undefined);
}

export function b64EncodeUnicode(str : string) {
    const utf8Bytes = new TextEncoder().encode(str);
    const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
}