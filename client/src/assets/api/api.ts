import axios from 'axios';
import { TaskType, NewTaskType, EditTaskType } from '../../redux/tasksReducer';

export const tasksAPI = {
    getAllTasks: () => {
        return axios.get<APIResponseType<Array<TaskType>>>('/btasks')
        .then(res => res.data);
    },
    getTask: (id: number) => {
        return axios.get<APIResponseType<TaskType>>('/btasks/' + id)
        .then(res => res.data);
    },
    createTask: (task: NewTaskType) => {
        return axios.post<APIResponseType>('/btasks/create', task)
        .then(res => res.data);
    },
    editTask: (task: EditTaskType) => {
        return axios.put<APIResponseType>('/btasks/edit', task)
        .then(res => res.data);
    },
    deleteTask: (id: number) => {
        return axios.delete<APIResponseType<TaskType>>('/btasks/' + id)
        .then(res => res.data);
    },
};

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    resultCode: RC,
    message: string,
};