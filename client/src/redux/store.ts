import { reducer as formReducer } from "redux-form";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

import { combineReducers, createStore, applyMiddleware, Action } from "redux";
import { tasksReducer } from "./tasksReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

export type AppStateType = ReturnType<typeof rootReducer>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never;