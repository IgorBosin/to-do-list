import React from 'react';

type BottonType = {
    bottonName: string
    callBack: () => void
}

const Button = (props: BottonType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <div>
            <button onClick={onClickHandler}>{props.bottonName}
            </button>
        </div>
    );
};

export default Button;

















