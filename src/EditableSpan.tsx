import React, {ChangeEvent, FC, useState} from 'react';

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
    const [newTitle, setNewTitle] = useState('')
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    }

    return (
        editMode
            ? <input autoFocus onBlur={offEditMode} onChange={changeLocalTitle} value={newTitle}/>
            : <span onDoubleClick={onEditMode} className={spanClasses}>{title}</span>
    );
};

export default EditableSpan;