import React from 'react';
import './TableRow.css';
import DropDownMenu from './DropDownMenu.js';



const TableRow = (props) => {

    const { ingredients, index, handleChange, result, onClick, onFocus, activeIndex, onBlur, nutritionValues, activeSetOfNutrients } = props;

    const getNutritionalValue = (abbr) => {
        const nutrition = nutritionValues.find((nutrient) => { return nutrient.abbreviation === abbr});
    
        if(nutrition) { return nutrition.value } 
        else { return 0 }
    };

    return (
        <tr>
            <td><input className='input-small' type='text' value={ingredients[index].amount} onChange={(e) => handleChange(e, index, 'amount')}></input></td>
            <td><input className='input-small' type='text' value={ingredients[index].type} onChange={(e) => handleChange(e, index, 'type')}></input></td>
            <td><DropDownMenu indexInput={index} name={ingredients[index].name} ingredients={ingredients} result={result} onChange={handleChange} onClick={onClick} onFocus={onFocus} activeIndex={activeIndex} onBlur={onBlur}/></td>
            <td className='input-large' type='text'>{result && result[0]['item'].name}</td>
            <td>{getNutritionalValue('P')}</td>
            <td>{getNutritionalValue('I')}</td> 
            <td>{getNutritionalValue('Fe')}</td>
            <td>{getNutritionalValue('Ca')}</td>
            <td>{getNutritionalValue('K')}</td>
            <td>{getNutritionalValue('Cu')}</td> 
            <td>{getNutritionalValue('Mg')}</td>
            <td>{getNutritionalValue('Se')}</td>
            <td>{getNutritionalValue('Zn')}</td>
        </tr>
    );
}

export default TableRow;