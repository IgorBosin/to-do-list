import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {TodolistWithRedux} from "../TodolistWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodolistType} from "../AppWithRedux";

const meta: Meta<typeof TodolistWithRedux> = {
    title: 'TODOLIST/TodolistWithRedux',
    component: TodolistWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TodolistWithRedux>;

const TodolistWithReduxWrap = () => { // как записать цикл через if, чтоб всегда был массив
    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists[0])
    return <TodolistWithRedux todolist={todolist}/>
};

export const TodolistWithReduxStory: Story = {
    render: () => <TodolistWithReduxWrap/>
}