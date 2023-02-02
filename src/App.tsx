import React, {useState} from 'react';
import NewComp from "./NewComp";

type currencyType = 'dol' | 'rub' | 'all'

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

    let [curr, setCurr] = useState<currencyType>('rub')

    let filterBanknots = money
    if(curr=='rub') {filterBanknots = money.filter((filt) =>
        filt.banknots == 'RUBLS')}
    if(curr=='dol') {filterBanknots = money.filter((filt) =>
        filt.banknots == 'Dollars')}

    let onClickHandler = (currency:currencyType) => {setCurr(currency)}

    return (
        <>
            <NewComp arrMoney={money}/>
            {/*<ul>*/}
            {/*    {filterBanknots.map((item,index) => {*/}
            {/*        return (*/}
            {/*            <li key={index}>*/}
            {/*                <span> {item.banknots}</span>*/}
            {/*                <span> {item.value}</span>*/}
            {/*                <span> {item.number}</span>*/}
            {/*            </li>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ul>*/}
            {/*<div>*/}
            {/*    <button onClick={()=>onClickHandler('dol')}>doll</button>*/}
            {/*    <button onClick={()=>onClickHandler('rub')}>rub</button>*/}
            {/*    <button onClick={()=>onClickHandler('all')}>all</button>*/}
            {/*</div>*/}
        </>
    );
};

export default App;