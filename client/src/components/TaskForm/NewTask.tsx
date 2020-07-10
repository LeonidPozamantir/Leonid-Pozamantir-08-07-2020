import React from 'react';
import TaskFormRedux, { TaskFormValuesType } from './TaskForm';
import { AppStateType } from '../../redux/store';
import { createTask, NewTaskType } from '../../redux/tasksReducer';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

const NewTask: React.FC<PropsType> = (props) => {

    const handleSave = (formData: TaskFormValuesType) => {
        props.createTask(formData, props.history);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        props.history.push('/tasks');
    };
    
    return <div>
        <h1>New task</h1>
        <TaskFormRedux onSubmit={handleSave} editMode={false} handleCancel={handleCancel} />
    </div>
};

const mapStateToProps = (state: AppStateType) => ({

});

export default withRouter(connect<MapPropsType, DispatchPropsType, RouteComponentProps, AppStateType>(mapStateToProps, { createTask })(NewTask));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    createTask: (formData: NewTaskType, history: History) => void,
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps;