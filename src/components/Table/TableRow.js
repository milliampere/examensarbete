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


/*
<td><DropDownMenu
        indexInput={index}
        name={ingredients[index].name}
        ingredients={ingredients}
        result={result}
        onChange={handleChange}
        onClick={onClick}
        onFocus={onFocus}
        activeIndex={activeIndex}
        onBlur={onBlur}
    />
</td>
<td className='input-large' type='text'>{result && result[0]['item'].name}</td>
{/*             <td>{result && result[0]['item'].livsmedelsverketId}</td>
             <td>{getNutritionalValue('P')}</td>
            <td>{getNutritionalValue('I')}</td>
            <td>{getNutritionalValue('Fe')}</td>
            <td>{getNutritionalValue('Ca')}</td>
            <td>{getNutritionalValue('K')}</td>
            <td>{getNutritionalValue('Cu')}</td>
            <td>{getNutritionalValue('Mg')}</td>
            <td>{getNutritionalValue('Se')}</td>
            <td>{getNutritionalValue('Zn')}</td> */

/*
		const getRecommendedValue = (abbr) => {
			const nutrition = fakeProps2.data.allNutrients.find((nutrient) => { return nutrient.abbreviation === abbr});
			if(nutrition) { return nutrition.woman3160 }
			else { return 0 }
		};

		const getNutritionNameAndUnit = (abbr) => {
			const nutrition = fakeProps2.data.allNutrients.find((nutrient) => { return nutrient.abbreviation === abbr});
			if(nutrition) { return `${nutrition.name} (${nutrition.unitforRI}) ` }
			else { return '' }
		};

		const totalNutritionalValue = (abbr) => {

			console.log(fakeProps3);

			const total = fakeProps3.data.allFoods.map((food)=>{
				const nutrition = food.nutritions.find((nutrient) => { return nutrient.abbreviation === abbr});
				if(nutrition) { return nutrition.value }
				else { return 0 }
			});

			console.log(total);
			total.reduce((total, num) => {return total + num});

        };
 */
