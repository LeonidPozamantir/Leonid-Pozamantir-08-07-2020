import React, { useEffect } from 'react';
import s from './Tasks.module.css';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/store';
import imgDone from '../assets/done.png';
import imgDelete from '../assets/delete.png';
import imgEdit from '../assets/edit.png';
import imgView from '../assets/view.png';
import { getTasks } from '../redux/tasksReducer';

const Tasks: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.getTasks();
    }, []);

    const tableRows = props.tasks.map(task => {
        return <tr key={task.id} className={s.row}>
            <td>
                <div className={s.actionsBlock}>
                    <div className={s.action}>
                        <div>
                            <img src={imgView} />
                        </div>
                        <div className={s.actionLabel}>
                            צפייה
                        </div>
                    </div>
                    <div className={s.action}>
                        <div>
                            <img src={imgEdit} />
                        </div>
                        <div className={s.actionLabel}>
                            עריכה
                        </div>
                    </div>
                    <div className={s.action}>
                        <div>
                            <img src={imgDelete} />
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
                <input type='checkbox'/>
            </td>
        </tr>;
    });

    return <div>
        <div className={s.header}>ניהול משימות</div>
        <div className={s.secondLine}>
            <button onClick={() => alert()}>משימה חדשה</button>
            <span className={s.count} dir="rtl" >רשימת הלקוחות שלך ({props.tasks.length})</span>
        </div>
        <table className={s.table}>
            <thead>
                <tr className={s.headerRow}>
                    <th className={s.actionsColumn}>פעולות</th>
                    <th className={s.dateColumn}>
                        <div className={s.arrowsContainer}><span className={s.sortBy}></span></div>
                        <span dir="rtl">תאריך יצירת המשימה</span>
                    </th>
                    <th className={s.emailColumn}>מייל</th>
                    <th className={s.phoneColumn}>טלפון</th>
                    <th className={s.usernameColumn}>
                        <div className={s.arrowsContainer}><span className={s.sortBy}></span></div>
                        <span dir="rtl">שם מםתמש</span>
                        <input type='checkbox'/>
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
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(MapStateToProps, { getTasks })(Tasks);

type MapPropsType = ReturnType<typeof MapStateToProps>;
type DispatchPropsType = {
    getTasks: () => void,
};
type PropsType = MapPropsType & DispatchPropsType;