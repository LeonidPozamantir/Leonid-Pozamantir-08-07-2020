
import { InferActionsTypes, BaseThunkType } from "./store";
import { tasksAPI, ResultCodesEnum } from "../assets/api/api";
import { stopSubmit, FormAction } from "redux-form";
import { History } from "history";


const initialState = {
    tasks: [] as Array<TaskType>,
    sort: { column: 'username', dir: 'asc' } as { column: 'username' | 'date', dir: 'asc' | 'desc' },
    checkedTasks: [] as Array<number>,
    allChecked: false,
    currentTask: null as TaskType | null,
};

export const tasksReducer = (state = initialState, action: ActionType ): StateType => {
    switch (action.type) {
        case 'TASKS/SET_TASKS':
            return { ...state, tasks: action.tasks };
        case 'TASKS/UNCHECK_TASKS':
            return { ...state, checkedTasks: [], allChecked: false };
        case 'TASKS/CHECK_TASK':
            if (action.id === null) {
                if (action.value) return { ...state, checkedTasks: state.tasks.map(t => t.id), allChecked: true };
                else return { ...state, checkedTasks: [], allChecked: false };
            }
            if (action.value) return { ...state, checkedTasks: [...state.checkedTasks, action.id] };
            return { ...state, checkedTasks: state.checkedTasks.filter(id => id !== action.id), allChecked: false };
        case 'TASKS/SET_CURRENT_TASK':
            return { ...state, currentTask: action.task };
        case 'TASKS/CHANGE_SORTING':
            const newDir = state.sort.column === action.column ? (state.sort.dir === 'asc' ? 'desc' : 'asc') : state.sort.dir;
            return { ...state, sort: { column: action.column, dir: newDir }}
        default:
            return state;
    }
};

export const actions = {
    setTasks: (tasks: Array<TaskType>) => ({ type: 'TASKS/SET_TASKS', tasks } as const),
    uncheckTasks: () => ({ type: 'TASKS/UNCHECK_TASKS' } as const),
    checkTask: (value: boolean, id: number | null) => ({ type: 'TASKS/CHECK_TASK', value, id } as const),
    setCurrentTask: (task: TaskType | null) => ({ type: 'TASKS/SET_CURRENT_TASK', task } as const),
    changeSorting: (column: 'username' | 'date') => ({ type: 'TASKS/CHANGE_SORTING', column } as const),
};

export const getAllTasks = (): ThunkType => (dispatch) => {
    return tasksAPI.getAllTasks()
    .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setTasks(data.data));
        } else {
            dispatch(actions.setTasks([]));
            dispatch(actions.uncheckTasks());
        }
    });
};

export const getTask = (id: number): ThunkType => (dispatch) => {
    return tasksAPI.getTask(id)
    .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setCurrentTask(data.data));
        } else {
            dispatch(actions.setCurrentTask(null));
        }
    });
};

export const createTask = (task: NewTaskType, history: History): ThunkType => (dispatch) => {
    return tasksAPI.createTask(task)
    .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
            history.push('/tasks');
        } else {
            const errorMessage = data.message || 'Some error occured';
            dispatch(stopSubmit('taskForm', { _error: errorMessage }));
        }
    });
};

export const editTask = (task: EditTaskType, history: History): ThunkType => (dispatch) => {
    return tasksAPI.editTask(task)
    .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
            history.push('/tasks');
        } else {
            const errorMessage = data.message || 'Some error occured';
            dispatch(stopSubmit('taskForm', { _error: errorMessage }));
        }
    });
};

export const deleteTask = (id: number): ThunkType => (dispatch) => {
    return tasksAPI.deleteTask(id)
    .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAllTasks());
        } else {
            const errorMessage = data.message || 'Some error occured';
            alert(errorMessage);
        }
    });
};

type StateType = typeof initialState;
export type NewTaskType = {
    username: string,
    phone: string,
    email: string,
};
export type EditTaskType = NewTaskType & {
    id: number,
    done: boolean,
}
export type TaskType = EditTaskType & {
    date: string,
};
type ActionType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType | FormAction>;