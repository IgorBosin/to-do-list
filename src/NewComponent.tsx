import React from 'react';

type NewComponentType = {
    topCars: topCarsType[]
}

export type topCarsType = {
    manufacturer: string;
    model: string;
    color: string;
}

const NewComponent = (props: NewComponentType) => {
    const CheckNewComponentLength: JSX.Element[] | JSX.Element = props.topCars.length
        ? props.topCars.map((carEl, index) => {
                return (
                    <tr key={index+1}>
                        <th>index:{index+1} {carEl.manufacturer}</th>
                        <td>{carEl.model}</td>
                        <td>{carEl.color}</td>

                    </tr>
                )
            })
        : <>'Element empty'</>

    return (
        < table>
            <caption> Top cars</caption>
            <>{CheckNewComponentLength}</>
        </table>
    )
};

export default NewComponent;