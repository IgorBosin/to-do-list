import React, {useState} from 'react';

type NewCompType = {
    arrMoney: moneyType[]
}

type moneyType = {
    banknots: string
    value: number
    number: string
}

type currButton= 'dol' | 'rub' | 'all'


const NewComp = (props:NewCompType) => {

    let [curr, setCurr] = useState<currButton>('all')

    let onClickHandler = (currButton:currButton) => {
        setCurr(currButton)
    }

    let filterBanknots = props.arrMoney
    if(curr=='dol') {filterBanknots = props.arrMoney.filter((filt)=> filt.banknots == 'Dollars')}
    if(curr=='rub') {filterBanknots = props.arrMoney.filter((filt)=> filt.banknots == 'RUBLS')}

    return (
        <div>
            <ul>
                {filterBanknots.map((item,index) => {
                    return (
                        <li key={index}>
                            <span> {item.banknots}</span>
                            <span> {item.value}</span>
                            <span> {item.number}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>onClickHandler('dol')}>doll</button>
                <button onClick={()=>onClickHandler('rub')}>rub</button>
                <button onClick={()=>onClickHandler('all')}>all</button>
            </div>
        </div>
    );
};

export default NewComp;