import React from 'react';
import { Input } from '../FormControls/FormControls';
import { InjectedFormProps, Field, reduxForm } from 'redux-form';
import s from './TaskForm.module.css';
import formStyle from '../FormControls/FormControls.module.css';
import { required, phoneValidator, emailValidator } from '../../utils/validators';


const TaskForm: React.FC<InjectedFormProps<TaskFormValuesType, OwnPropsType> & OwnPropsType> = (props) => {

    return <form className={s.settingsBlock} onSubmit={props.handleSubmit}>
        <Field placeholder="שם משתמש" name="username" component={Input} validate={[required]} />
        <Field placeholder="טלפון" name="phone" component={Input} validate={[required, phoneValidator]} />
        <Field placeholder="מייל" name="email" component={Input} validate={[required, emailValidator]} />
        {props.editMode && <Field name="done" component={Input} type="checkbox" text="Done"/>}
        <div>
            <button disabled={props.pristine || props.invalid}>Save</button>
            <button onClick={props.handleCancel}>Cancel</button>
        </div>
        
        {props.error && <div className={formStyle.formSummaryError}>
            {props.error}
        </div>}
    </form>;
};

const TaskFormRedux = reduxForm<TaskFormValuesType, OwnPropsType>({form: 'taskForm', enableReinitialize: true })(TaskForm);

export type TaskFormValuesType = {
    username: string,
    phone: string,
    email: string,
    done?: boolean,
};

type OwnPropsType = {
    editMode: boolean,
    handleCancel: (e: React.MouseEvent) => void,
};

export default TaskFormRedux;