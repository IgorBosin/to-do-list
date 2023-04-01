import React, {ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddBoxIcon from '@mui/icons-material/AddBox';

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

    // const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const isAddBtnDisabled = title.length === 0 || isUserMessageToLong || error
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}>Task title is to long</div>
    const inputErrorClasses = error || isUserMessageToLong ? 'input-error' : ''

        // .css-by33ds-MuiButtonBase-root-MuiButton-root

    return (
        // <div style={{display:'flex'}} >
        <div>
            <TextField
                error={error}
                helperText={error && 'Please, enter title'}
                // sx={{ '& .MuiInputBase-input': { p: '4.25px' } }}
                variant="outlined"
                size={'small'}
                value={title}
                onKeyDown={onKeyDownAddItem}
                label='Enter title'
                onChange={changeLocalTitle}
                className={inputErrorClasses}>
            </TextField>
            <Button
                size="small"
                sx={{ '& .MuiButton-root': { p: '4.25px' } }}
                style={{padding:'8.63px'}}
                // disabled={isAddBtnDisabled}
                onClick={addItem}
                variant="contained"
                disableElevation
                endIcon={<AddBoxIcon color={isAddBtnDisabled ? "disabled" : "primary"}/>}
            >Add
            </Button>
            {userMaxLengthMessage}
            {/*{userErrorMessage}*/}
        </div>
    );
};