import React from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import NutritionsData from './NutritionsData.js';
import './TableRow.css';

const TableRow = (props) => {

    const {
        rawInput,
        index,
        changableInput,
        handleChange,
        calculatedNutritionResult
    } = props;

    let backgroundColor = 'white';
    if(index % 2){
        backgroundColor = '#e5e6e8';
    }

    let wrongUnit = '';
    if(calculatedNutritionResult.errorMess === 'vi hittar inte vikt/port, skriv in mått i gram istället') {
        wrongUnit = '#F5D2CB';
    }

    let rawInputString = `${rawInput.amount || ''} ${rawInput.type || ''} ${rawInput.name || ''}`;
    let rawInputStringShort = '';
    let raw = '';
    if(rawInputString.length > 20){
        rawInputStringShort = rawInputString.substring(0,20) + "...";
        raw =
            <div className="tooltip">{rawInputStringShort}
                <span className="tooltiptext">
                    {rawInputString}
                </span>
            </div>
    }
    else {
        raw = <div>{rawInputString}</div>;
    }

    return (
        <div className="table-row">
            <div className='receipt-row'>{raw}</div>
            <input className='input-small' style={{backgroundColor: backgroundColor}} type='text' value={changableInput.amount || ''} onChange={(e) => handleChange(e.target.value, index, 'amount')}></input>
            <input className='input-small' style={{backgroundColor: wrongUnit ? wrongUnit : backgroundColor}} type='text' value={changableInput.type || ''} onChange={(e) => handleChange(e.target.value, index, 'type')}></input>
            <DropDownMenu
                indexInput={index}
                name={changableInput.name}
                backgroundColor={backgroundColor}
                {...props}
            />
            <NutritionsData calculatedNutritionResult={calculatedNutritionResult.array}/>
        </div>
    )
}

// export const foodListNutritions = gql`
// query Food {
//   Food(livsmedelsverketId: 4) {
//     id
//     livsmedelsverketId
//     name
//     nutritions
//   }
// }
//`

export default TableRow;



