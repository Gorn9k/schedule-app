import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://schedulecit.vstu.by/api'
    // baseURL: 'http://localhost:3011'
});

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

export type Schedule = {
    lessons: Lesson[],
    classesNumbers: string[],
    days: number[],
    lessonsNumbers: number[]
}

export type LoadInfo = {
    id?: number
    date: string
    time: string
    type: string
    responsible: string
    description: string
}

export type ScheduleParams = {
    startDate: string
    endDate: string
    frame: string
}

export type LoadInfoParams = {
    startDate: string
    endDate: string
}

export const getSchedule = async (startDate: string, endDate: string, frame: string): Promise<Schedule> => {
    const response =
        await instance.get<Schedule, AxiosResponse<Schedule>, ScheduleParams>(
            `/schedule`,
            {
                params: {
                    startDate,
                    endDate,
                    frame
                }
            }
        );
    return response.data;
};

export const getLoadsInfo = async (startDate: string, endDate: string): Promise<LoadInfo[]> => {
    const response =
        await instance.get<LoadInfo[], AxiosResponse<LoadInfo[]>, LoadInfoParams>(
            `/class-room/number/219/loads-info/list`,
            {
                params: {
                    startDate,
                    endDate
                }
            }
        );
    return response.data;
};

export const createLoadInfo = async (loadInfo: LoadInfo, authToken: string | null): Promise<AxiosResponse<void>> => {
    return await instance.post<void, AxiosResponse<void>, LoadInfo>(`/class-room/number/219/loads-info/create`,
        loadInfo, authToken ? {
            headers: {
                Authorization: `Basic ${authToken}`,
            }
        } : undefined);
}

export const editLoadInfo = async (loadInfo: LoadInfo, authToken: string | null): Promise<void> => {
    await instance.put<void, AxiosResponse<void>, LoadInfo>(`/class-room/number/219/load-info/${loadInfo?.id}/edit`,
        loadInfo, authToken ? {
            headers: {
                Authorization: `Basic ${authToken}`,
            }
        } : undefined);
}

export const deleteLoadInfo = async (id: number, authToken: string | null): Promise<void> => {
    await instance.delete<void, AxiosResponse<void>>(`/class-room/number/219/load-info/${id}/delete`,
        authToken ? {
            headers: {
                Authorization: `Basic ${authToken}`,
            }
        } : undefined);
}

export function b64EncodeUnicode(str: string) {
    const utf8Bytes = new TextEncoder().encode(str);
    const binaryString = Array.from(utf8Bytes, byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
}