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
        nutritionsData  // old calculatedNutritionResult
    } = props;


    let backgroundColor = 'white';
    if(index % 2){
        backgroundColor = '#e5e6e8';
    }

    let wrongUnit = '';
    if(nutritionsData.errorMess === 'vi hittar inte vikt/port, skriv in mått i gram istället') {
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



