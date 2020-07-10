import React, { useEffect } from 'react';
import s from './Tasks.module.css';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import imgDone from '../../assets/done.png';
import imgDelete from '../../assets/delete.png';
import imgEdit from '../../assets/edit.png';
import imgView from '../../assets/view.png';
import { getAllTasks, actions, deleteTask } from '../../redux/tasksReducer';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Tasks: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.getTasks();
    }, []);

    const handleNewTask = () => {
        props.history.push('/new-task');
    };

    const handleEditTask = (id: number) => {
        props.history.push('/edit-task/' + id);
    };

    const handleViewTask = (id: number) => {
        props.history.push('/task/' + id);
    };

    const handleDeleteTask = (id: number) => {
        props.deleteTask(id);
    };

    const handleCheck = (value: boolean, id: number | null) => {
        console.log(value, id);
        props.checkTask(value, id);
    };

    const tasksSorted = props.tasks.sort((a, b) => {
        function convertToDate(stringDate: string) {
            const [d, m, y] = stringDate.split('.');
            return new Date([y, m, d].join('-'));
        }
        const ca = props.sort.column === 'username' ? a.username : convertToDate(a.date);
        const cb = props.sort.column === 'username' ? b.username : convertToDate(b.date);
        return (ca < cb ? -1 : (ca > cb ? 1 : 0)) * (props.sort.dir === 'desc' ? -1 : 1);
    });  
    const tableRows = tasksSorted.map(task => {
        return <tr key={task.id} className={s.row}>
            <td>
                <div className={s.actionsBlock}>
                    <div className={s.action}>
                        <div>
                            <img src={imgView} onClick={() => handleViewTask(task.id)} />
                        </div>
                        <div className={s.actionLabel}>
                            צפייה
                        </div>
                    </div>
                    <div className={s.action}>
                        <div>
                            <img src={imgEdit} onClick={() => handleEditTask(task.id)} />
                        </div>
                        <div className={s.actionLabel}>
                            עריכה
                        </div>
                    </div>
                    <div className={s.action}>
                        <div>
                            <img src={imgDelete} onClick={() => handleDeleteTask(task.id)} />
                        </div>
                        <div className={s.actionLabel}>
                            מחיקה
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className={s.dateBlock}>
                    <div className={s.done}>
                        {task.done && <img src={imgDone} />}
                    </div>
                    <div className={s.date}>{task.date}</div>
                </div>
            </td>
            <td>
                {task.email}
            </td>
            <td>
                {task.phone}
            </td>
            <td>
                {task.username}
                <input type='checkbox' checked={props.checkedTasks.some(id => id === task.id)} onChange={(e) => handleCheck(e.target.checked, task.id)} />
            </td>
        </tr>;
    });

    return <div>
        <div className={s.header}>ניהול משימות</div>
        <div className={s.secondLine}>
            <button onClick={handleNewTask}>משימה חדשה</button>
            <span className={s.count} dir="rtl" >רשימת הלקוחות שלך ({props.tasks.length})</span>
        </div>
        <table className={s.table}>
            <thead>
                <tr className={s.headerRow}>
                    <th className={s.actionsColumn}>פעולות</th>
                    <th className={s.dateColumn}>
                        <div className={s.arrowsContainer}><span className={s.sortBy} onClick={() => props.changeSorting('date')}></span></div>
                        <span dir="rtl">תאריך יצירת המשימה</span>
                    </th>
                    <th className={s.emailColumn}>מייל</th>
                    <th className={s.phoneColumn}>טלפון</th>
                    <th className={s.usernameColumn}>
                        <div className={s.arrowsContainer}><span className={s.sortBy} onClick={() => props.changeSorting('username')}></span></div>
                        <span dir="rtl">שם מםתמש</span>
                        <input type='checkbox' checked={props.allChecked} onChange={(e) => handleCheck(e.target.checked, null)} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </div>;
};

const MapStateToProps = (state: AppStateType) => ({
    tasks: state.tasks.tasks,
    sort: state.tasks.sort,
    checkedTasks: state.tasks.checkedTasks,
    allChecked: state.tasks.allChecked,
});

export default withRouter(connect<MapPropsType, DispatchPropsType, {}, AppStateType>(MapStateToProps, { getTasks: getAllTasks, changeSorting: actions.changeSorting, 
    deleteTask, checkTask: actions.checkTask })(Tasks));

type MapPropsType = ReturnType<typeof MapStateToProps>;
type DispatchPropsType = {
    getTasks: () => void,
    changeSorting: (column: 'username' | 'date') => void,
    deleteTask: (id: number) => void,
    checkTask: (value: boolean, id: number | null) => void,
};
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps;