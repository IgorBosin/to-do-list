import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callback: (newTitle:string)=>void
}

const EditableSpan = (props: PropsType) => {
    let [newTitle, setNewTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const editHandler = () => {
        setEdit(!edit)
        addTask()
    }
    const addTask = () => {
        props.callback(newTitle)
    }


    return (
        edit
            ? <input onChange={onChangeHandler} autoFocus onBlur={editHandler} value={newTitle}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;