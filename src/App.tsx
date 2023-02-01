import React, {useState} from 'react';

const App = () => {

    let [num, funNum] = useState(1)

    const onClickHandler = () => {
        funNum(++num)
    }

    const onClickNull = () => {
        funNum(0)
    }

    return (
        <div>
            <h1>{num}</h1>
            <button onClick={onClickHandler}>number</button>
            <button onClick={onClickNull}>null</button>
        </div>
    );
};

export default App;