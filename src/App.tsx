import React, {useState} from 'react';
import button from "./Button";

type moneyArrayType = {
    banknots: string;
    value: number;
    number: string
}

const App = () => {

    const [money, setMoney] = useState([
        {banknots: 'Dollars', value: 100, number: ' a1234567890'},
        {banknots: 'Dollars', value: 50, number: ' z1234567890'},
        {banknots: 'RUBLS', value: 100, number: ' w1234567890'},
        {banknots: 'Dollars', value: 100, number: ' e1234567890'},
        {banknots: 'Dollars', value: 50, number: ' c1234567890'},
        {banknots: 'RUBLS', value: 100, number: ' r1234567890'},
        {banknots: 'Dollars', value: 50, number: ' x1234567890'},
        {banknots: 'RUBLS', value: 50, number: ' v1234567890'},
    ])

    let moneyRub = money.filter((mon:moneyArrayType) => mon.banknots=='RUBLS')

    let onClickFilterHandler = (bankn:string) => {console.log(bankn)}

    return (
        <div>
            <ul>
                {moneyRub.map((moneyArray: moneyArrayType, index) => {
                    return (
                        <li key={index}>
                            <span> {moneyArray.banknots}</span>
                            <span> {moneyArray.value}</span>
                            <span> {moneyArray.number}</span>
                        </li>
                    )
                })}
            </ul>
            <div style={{marginLeft: '35px'}}>
                <button onClick={() => onClickFilterHandler('all')}>all</button>
                <button onClick={() => onClickFilterHandler('rub')}>rub</button>
                <button onClick={() => onClickFilterHandler('dol')}>dol</button>
            </div>
        </div>

    )
}
export default App;