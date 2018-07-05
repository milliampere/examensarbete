import React from 'react';
import PropTypes from 'prop-types';
import './TableRow.css';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import NutritionsData from './NutritionsData.js';

const TableRow = (props) => {

    const {
        index,
        rawInput,
        changableInput,
        handleChange,
        nutritionsData,  // old calculatedNutritionResult
        unitErrorMessage,
    } = props;

   const amount = Number(changableInput.amount);

    let backgroundColor = 'white';
    if(index % 2){
        backgroundColor = '#e5e6e8';
    }

    let wrongUnitColor = '';
    if(unitErrorMessage !== '') {
        wrongUnitColor = '#F5D2CB';
    }

    let wrongAmountColor = '';
    if(amount === 0){
        wrongAmountColor = '#F5D2CB';
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
            <input className='input-small' style={{backgroundColor: wrongAmountColor ? wrongAmountColor : backgroundColor}} type='text' value={amount || ''} onChange={(e) => handleChange(e.target.value, index, 'amount')}></input>
            <div className='input-unit'>
                {unitErrorMessage && <div className='unit-tooltip'>{unitErrorMessage}</div>}
                <input className='input-small' style={{backgroundColor: wrongUnitColor ? wrongUnitColor : backgroundColor}} type='text' value={changableInput.type || ''} onChange={(e) => handleChange(e.target.value, index, 'type')}></input>
            </div>
            <DropDownMenu
                indexInput={index}
                name={changableInput.name}
                backgroundColor={backgroundColor}
                {...props}
            />
            <NutritionsData calculatedNutritionResult={nutritionsData.array}/>
        </div>
    )
}

TableRow.propTypes = {
    index: PropTypes.number.isRequired,
    rawInput: PropTypes.object.isRequired,
    changableInput: PropTypes.shape({
        //amount: PropTypes.string,   // ibland string, ibland number...
        livsmedelsverketId: PropTypes.number,   //or null?
        match: PropTypes.array,
        name: PropTypes.string,
        type: PropTypes.string,
        validUnit: PropTypes.bool
    }).isRequired,
    activeTab: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    nutritionsData: PropTypes.shape({      // old calculatedNutritionResult
        array: PropTypes.array.isRequired,
        error: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string.isRequired
    }).isRequired
}

export default TableRow;



