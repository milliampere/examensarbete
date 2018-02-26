import React from 'react';
import './TableRow.css';
import DropDownMenu from './DropDownMenu.js';

const TableRow = (props) => {

    const { ingredients, index, handleChange, result, onClick, onFocus, activeIndex, onBlur } = props;

    return (
        <tr>
            <td><input className='input-small' type='text' value={ingredients[index].amount} onChange={(e) => handleChange(e, index, 'amount')}></input></td>
            <td><input className='input-small' type='text' value={ingredients[index].type} onChange={(e) => handleChange(e, index, 'type')}></input></td>
            <td><DropDownMenu indexInput={index} name={ingredients[index].name} ingredients={ingredients} result={result} onChange={handleChange} onClick={onClick} onFocus={onFocus} activeIndex={activeIndex} onBlur={onBlur}/></td>
            <td className='input-large' type='text'>{result && result[0]['item'].name}</td>
        </tr>
    );
}

export default TableRow;