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
        activeTab
    } = props;

    let backgroundColor = 'white';

    if(index % 2){
        backgroundColor = '#e5e6e8';
    }

    return (
        <div className="table-row">
            <div className='receipt-row'>{`${rawInput.amount || ''} ${rawInput.type || ''} ${rawInput.name || ''}`}</div>
            <input className='input-small' style={{backgroundColor: backgroundColor}} type='text' value={changableInput.amount || ''} onChange={(e) => handleChange(e.target.value, index, 'amount')}></input>
            <input className='input-small' style={{backgroundColor: backgroundColor}} type='text' value={changableInput.type || ''} onChange={(e) => handleChange(e.target.value, index, 'type')}></input>
            <DropDownMenu
                indexInput={index}
                name={changableInput.name}
                backgroundColor={backgroundColor}
                {...props}
            />
            <NutritionsData changableInput={changableInput} activeTab={activeTab}/>
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



