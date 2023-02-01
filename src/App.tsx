import React from 'react';
import './App.css';
import Button from "./Button";

type AppType = {
    bDel: (value: string) => void
    objShow: (kyky: string, age: number) => void
}

function App(props: AppType) {
    return (
        <div className="App">
            <Button bName='show' objShow={() =>
                props.objShow('Igor', 18)}/>
            <Button bName='delete' objShow={() =>
                props.bDel('delete')}/>
        </div>
    );
}


export default App;
