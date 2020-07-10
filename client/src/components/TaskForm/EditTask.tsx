import React, { useEffect } from 'react';
import TaskFormRedux, { TaskFormValuesType } from './TaskForm';
import { AppStateType } from '../../redux/store';
import { createTask, NewTaskType, EditTaskType, getTask, editTask, actions, TaskType } from '../../redux/tasksReducer';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

const EditTask: React.FC<PropsType> = (props) => {

    const handleSave = (formData: TaskFormValuesType) => {
        const task = { id: parseInt(props.match.params.id), ...formData };
        props.editTask(task as EditTaskType, props.history);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        props.history.push('/tasks');
    };

    useEffect(() => {
        props.setCurrentTask(null);
        const id = parseInt(props.match.params.id);
        if (!id) return;
        props.getTask(parseInt(props.match.params.id))
    }, [props.match.params.id]);

    if (!props.currentTask) return <div></div>;

    const initialValues = {
        username: props.currentTask.username,
        phone: props.currentTask.phone,
        email: props.currentTask.email,
        done: props.currentTask.done,
    };
    
    return <div>
        <h1>Edit task</h1>
        <TaskFormRedux onSubmit={handleSave} initialValues={ initialValues } editMode={true} handleCancel={handleCancel} />
    </div>
};

const mapStateToProps = (state: AppStateType) => ({
    currentTask: state.tasks.currentTask,
});

export default withRouter(connect<MapPropsType, DispatchPropsType, RouteComponentProps<ParamsType>, AppStateType>(mapStateToProps, { getTask, editTask, setCurrentTask: actions.setCurrentTask })(EditTask));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getTask: (id: number) => void,
    editTask: (task: EditTaskType, history: History) => void,
    setCurrentTask: (task: TaskType | null) => void,
};
type ParamsType = {
    id: string,
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<ParamsType>;