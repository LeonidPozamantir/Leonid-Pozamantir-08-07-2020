import axios from 'axios';
import { TaskType } from '../../redux/tasksReducer';

export const tasksAPI = {
    getAllTasks: () => {
        return axios.get<APIResponseType<Array<TaskType>>>('/tasks')
        .then(res => res.data);
    }
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