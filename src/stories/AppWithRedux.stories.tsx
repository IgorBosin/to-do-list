import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator] // в ф-цию ReduxStoreProviderDecorator в параметры приходит
}; // компонента AppWithRedux и оборачивается Provider, тем самым AppWithRedux начинает работать, т.к. ей нужен Provider

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {};

