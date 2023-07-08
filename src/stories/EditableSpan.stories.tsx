import type {Meta, StoryObj} from '@storybook/react';
import React from "react";
import {EditableSpan} from "../EditableSpan";
import {TextField} from "@mui/material";


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    args: {
        value: 'default value'
    },
    argTypes: { // если не написать argTypes, то при изменении отобразится: onChange: "default valueewqew", а иначе
        onChange:{
            action: 'change title'  // change title: "default valueуцй"
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};

export const EditableSpanEditModeStory = () => {
    return <TextField value={'default value'} onChange={x => x} autoFocus onBlur={x => x}/>
};

