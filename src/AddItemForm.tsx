import React, {ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type AddItemFormType = {
    addNewItem: (newTitle: string) => void
    maxLengthUserMessage: number
}

export const AddItemForm: FC<AddItemFormType> = (
    {
        maxLengthUserMessage,
        addNewItem,
    }) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addNewItem(title)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyDownAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()

    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const isAddBtnDisabled = title.length === 0 || isUserMessageToLong || error
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}>Task title is to long</div>
    const inputErrorClasses = error || isUserMessageToLong ? 'input-error' : ''

    return (
        <div>
            <input
                className={inputErrorClasses}
                value={title}
                onKeyDown={onKeyDownAddItem}
                placeholder='Please, enter title'
                onChange={changeLocalTitle}/>
            <button
                disabled={isAddBtnDisabled}
                onClick={addItem}>+
            </button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};

