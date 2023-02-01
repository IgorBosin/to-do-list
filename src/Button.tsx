import React from 'react';

export type ButtonType = {
    bName: string
    objShow: () => void
}
const Button = (props: ButtonType) => {

    const showItem = () => {
        props.objShow()
    }

    return (
        <div>
            <button onClick={showItem}>{props.bName}</button>
        </div>
    );
};
export default Button;













