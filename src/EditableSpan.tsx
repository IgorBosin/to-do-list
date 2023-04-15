import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    spanClasses?: string
    inputClasses?: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanType> = (
    {
        title,
        spanClasses,
        changeTitle
    }) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => changeTitle(e.currentTarget.value)
    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        changeTitle(title)
    }

    return (
        editMode
            ? <TextField
                variant={'standard'}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeLocalTitle}
                onKeyDown={(e)=>e.key==='Enter' && offEditMode()}
            />
            // ? <input autoFocus onBlur={offEditMode} onChange={changeLocalTitle} value={newTitle}/>
            : <span onDoubleClick={onEditMode} className={spanClasses}>{title}</span>
    );
};

export default EditableSpan;