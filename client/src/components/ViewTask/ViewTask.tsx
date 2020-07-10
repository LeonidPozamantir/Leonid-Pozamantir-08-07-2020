import React, { useEffect } from 'react';
import { AppStateType } from '../../redux/store';
import { getTask, actions, TaskType } from '../../redux/tasksReducer';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const ViewTask: React.FC<PropsType> = (props) => {

    const handleOk = () => {
        props.history.push('/tasks');
    };

    useEffect(() => {
        props.setCurrentTask(null);
        const id = parseInt(props.match.params.id);
        if (!id) return;
        props.getTask(parseInt(props.match.params.id))
    }, [props.match.params.id]);

    if (!props.currentTask) return <div></div>;

    return <div>
        <h1>View task</h1>
        <div>Username: {props.currentTask.username}</div>
        <div>Phone: {props.currentTask.phone}</div>
        <div>Email: {props.currentTask.email}</div>
        <div>Creation date: {props.currentTask.date}</div>
        <div>Status: {props.currentTask.done ? 'Done' : 'Not done'}</div>
        <button onClick={handleOk}>Ok</button>
    </div>
};

const mapStateToProps = (state: AppStateType) => ({
    currentTask: state.tasks.currentTask,
});

export default withRouter(connect<MapPropsType, DispatchPropsType, RouteComponentProps<ParamsType>, AppStateType>(mapStateToProps, { getTask, setCurrentTask: actions.setCurrentTask })(ViewTask));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getTask: (id: number) => void,
    setCurrentTask: (task: TaskType | null) => void,
};
type ParamsType = {
    id: string,
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<ParamsType>;