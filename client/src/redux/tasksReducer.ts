import { ThunkAction } from "redux-thunk";
import { InferActionsTypes, BaseThunkType } from "./store";
import { tasksAPI, ResultCodesEnum } from "../assets/api/api";

const initialState = {
    tasks: [] as Array<TaskType>
};

export const tasksReducer = (state = initialState, action: ActionType ): StateType => {
    switch (action.type) {
        case 'TASKS/SET_TASKS':
            return { ...state, tasks: action.tasks };
        default:
            return state;
    }
};

const actions = {
    setTasks: (tasks: Array<TaskType>) => ({ type: 'TASKS/SET_TASKS', tasks } as const),
};

export const getTasks = (): ThunkType => (dispatch) => {
    return tasksAPI.getAllTasks()
    .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
            console.log(data.data)
            dispatch(actions.setTasks(data.data));
        }
    });
}

type StateType = typeof initialState;
export type TaskType = {
    id: number,
    username: string,
    phone: string,
    email: string,
    done: boolean,
    date: string,
};
type ActionType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;