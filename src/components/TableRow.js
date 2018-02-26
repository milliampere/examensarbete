import React from 'react';
import './TableRow.css';

const TableRow = (props) => {

    const { ingredients, index, handleChange } = props;

    return (
        <tr>
            <td><input className='input-small' type='text' value={ingredients[index].amount} onChange={(e) => handleChange(e, index, 'amount')}></input></td>
            <td><input className='input-small' type='text' value={ingredients[index].type} onChange={(e) => handleChange(e, index, 'type')}></input></td>
            <td><input className='input-large' type='text' value={ingredients[index].name} onChange={(e) => handleChange(e, index, 'name')}></input></td>
        </tr>
    );
}

export default TableRow;