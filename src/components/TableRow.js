import React from 'react';

const TableRow = (props) => {

    return (
        <tr>
            <td><input type='text' value={props.ingredients[props.index].amount} onChange={(e) => props.handleChange(e, props.index, 'amount')}></input></td>
            <td><input type='text' value={props.ingredients[props.index].type} onChange={(e) => props.handleChange(e, props.index, 'type')}></input></td>
            <td><input type='text' value={props.ingredients[props.index].name} onChange={(e) => props.handleChange(e, props.index, 'name')}></input></td>
        </tr>
    );
}

export default TableRow;