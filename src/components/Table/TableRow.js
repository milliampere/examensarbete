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
        activeIndex,
        handleFocus,
        handleBlur,
        portions
    } = props;


    return (
        <tr>
            <td style={{fontSize: '10px'}}>{`${rawInput.amount || ''} ${rawInput.type || ''} ${rawInput.name || ''}`}</td>
            <td><input className='input-small' type='text' value={changableInput.amount || ''} onChange={(e) => handleChange(e.target.value, index, 'amount')}></input></td>
            <td><input className='input-small' type='text' value={changableInput.type || ''} onChange={(e) => handleChange(e.target.value, index, 'type')}></input></td>
            <td><DropDownMenu
                    indexInput={index}
                    name={changableInput.name}
                    changableInput={changableInput}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    activeIndex={activeIndex}
                    onBlur={handleBlur}
                />
            </td>
            <td>
                {changableInput.livsmedelsverketId && <NutritionsData changableInput={changableInput}/>}
            </td>
        </tr>
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



