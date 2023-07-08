import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import React, {useState} from "react";
import {Task} from "../Task";

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        task: {
            id: '1.1',
            title: 'Task',
            isDone: false
        },
        changeTaskTitle: action('Change task title'),
        removeTask: action('Remove task'),
        changeTaskStatus: action('Change task status'),
        todolistId: '1',
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
    args: {
        // task: { // ЧТОБ НЕ ДУБЛИРОВАТЬ КОД В ДВУХ СТОРИС, ПЕРЕНОСИМ В const meta, А ПОТОМ ПЕРЕОПРЕДЕЛЯЕМ
        //     id: '1.1',
        //     title: 'Task',
        //     isDone: false
        // },
        // changeTaskTitle: action('Change task title'), // ВЫНЕСЛИ В const meta
        // removeTask: action('Remove task'),  // ВЫНЕСЛИ В const meta
        // changeTaskStatus: action('Change task status'), // ВЫНЕСЛИ В const meta
        // todolistId: '1', // ВЫНЕСЛИ В const meta
    }
};

export const TaskIsDoneStory: Story = {
    args: {
        task: {
            id: '1.1',
            title: 'Task',
            isDone: true
        },
        // changeTaskTitle: action('Change task title'), // ВЫНЕСЛИ В const meta
        // removeTask: action('Remove task'), // ВЫНЕСЛИ В const meta
        // changeTaskStatus: action('Change task status'),  // ВЫНЕСЛИ В const meta
        // todolistId: '1',  // ВЫНЕСЛИ В const meta
    }
};

export const TaskChangingComponentStory = () => {
    const [task, setTask] = useState({
        id: '1.1',
        title: 'Task',
        isDone: true
    })
    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }

    const changeTaskTitle = (taskId:string, title: string) => {
        setTask({...task, title: title})
    }

    return <Task
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={action('removeTask')}
        task={task}
        todolistId={'1'}/>
}
