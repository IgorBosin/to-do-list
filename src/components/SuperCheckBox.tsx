import React, {ChangeEvent} from 'react';

type SuperCheckBoxType = {
    callBack: (e:boolean) => void
    isDone: boolean
}

export const SuperCheckBox = (props: SuperCheckBoxType) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
        <input type="text" checked={props.isDone} onChange={onChangeHandler}/>
    );
};
