import React from 'react';

type NewComponentType = {
    cars: propsTypeCars[]
}

type propsTypeCars = {
    manufacturer: string;
    model: string;
}

const NewComponent = (props: NewComponentType) => {
    debugger
    return (
        <div>
            <table>
                <caption>Cars</caption>
                <tr>
                    {props.cars.map((carsEl, index) => {
                        return (
                            <th key={index+1}>{carsEl.manufacturer}</th>
                        )
                    })}
                </tr>
                <tr>
                    {props.cars.map((carsEl,index)=>{
                        return(
                            <th key={index+1}>{carsEl.model}</th>
                        )
                    })}
                </tr>
            </table>
        </div>
    );
};

export default NewComponent;





