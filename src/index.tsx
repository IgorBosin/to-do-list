import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const bDel = (del: string) => {
    console.log(del)
}
const objShow = (name: string, age: number) => {
    console.log({name: name, age: age})
}
root.render(
    <React.StrictMode>
        <App bDel={bDel} objShow={objShow}/>
    </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

