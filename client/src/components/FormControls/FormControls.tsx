import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import s from './FormControls.module.css';

type WrappedFieldPropsWithText = WrappedFieldProps & {text?: string};

export const Input: React.FC<WrappedFieldPropsWithText> = ({input, meta, ...rest}) => { 
    const hasError = meta.touched && meta.error;
    return <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        <input {...input} {...rest}/>{rest.text}
        {hasError && <div><span>{meta.error}</span></div>}
    </div>;
};