import React from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import './TableRow.css';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import NutritionsData from './NutritionsData.js'

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

    let iconColor = '';
	if (changableInput.validUnit === true) {
		iconColor = 'green';
	}else {
		iconColor = 'red';
	}

    let rawInputString = `${rawInput.amount || ''} ${rawInput.type || ''} ${rawInput.name || ''}`;
    let rawInputStringShort = '';
    let raw = '';
    if(rawInputString.length > 20){
        rawInputStringShort = rawInputString.substring(0,20) + "...";
        raw = <div className="tooltip">{rawInputStringShort}<span className="tooltiptext">{rawInputString}</span></div>
    }
    else {
        raw = <div>{rawInputString}</div>;
    }

    return (
        <div className="table-row">
            <div className='receipt-row'>{raw}</div>
            <input className='input-small' style={{backgroundColor: backgroundColor}} type='text' value={changableInput.amount || ''} onChange={(e) => handleChange(e.target.value, index, 'amount')}></input>
            <div className='type-container'>
                <span className='fa fa-check' style={{color: iconColor}}></span>
                <input className='input-small' style={{backgroundColor: backgroundColor}} type='text' value={changableInput.type || ''} onChange={(e) => handleChange(e.target.value, index, 'type')}></input>
            </div>
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



