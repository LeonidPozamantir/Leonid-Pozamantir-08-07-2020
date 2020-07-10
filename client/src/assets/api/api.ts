import axios from 'axios';
import { TaskType, NewTaskType, EditTaskType } from '../../redux/tasksReducer';

export const tasksAPI = {
    getAllTasks: () => {
        return axios.get<APIResponseType<Array<TaskType>>>('/tasks')
        .then(res => res.data);
    },
    getTask: (id: number) => {
        return axios.get<APIResponseType<TaskType>>('/tasks/' + id)
        .then(res => res.data);
    },
    createTask: (task: NewTaskType) => {
        return axios.post<APIResponseType>('/tasks/create', task)
        .then(res => res.data);
    },
    editTask: (task: EditTaskType) => {
        return axios.put<APIResponseType>('/tasks/edit', task)
        .then(res => res.data);
    },
    deleteTask: (id: number) => {
        return axios.delete<APIResponseType<TaskType>>('/tasks/' + id)
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