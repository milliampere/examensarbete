import React, { Component } from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import TableRow from './TableRow';
import Button from './Button';
import fakeProps1 from '../data/nutritionForOneFood';
import fakeProps2 from '../data/woman31-60';
import fakeProps3 from '../data/nutritionFor8Foods';

class Table extends Component {

	render() {

		//console.log(fakeProps1.data);
		//console.log(fakeProps2.data);

		const { handleChange, onFocus, foodArray, resultArray, activeIndex } = this.props;

		const foods = this.props.foodArray.map((item, index) => {
			return <TableRow
				key={index}
				index={index}
				amount={item.amount}
				type={item.type}
				name={item.name}
				handleChange={handleChange}
				onFocus={onFocus}
				ingredients={foodArray}
				result={resultArray[index]}
				activeIndex={activeIndex}
				nutritionValues={fakeProps1.data.Food.nutritions}
			/>
		})

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



		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Volym</th>
							<th>Mått</th>
							<th>Ingredienser</th>
							<th>Sökresultat</th>
							<th>{getNutritionNameAndUnit('P')}</th>
							<th>{getNutritionNameAndUnit('I')}</th>
							<th>{getNutritionNameAndUnit('Fe')}</th>
							<th>{getNutritionNameAndUnit('Ca')}</th>
							<th>{getNutritionNameAndUnit('K')}</th>
							<th>{getNutritionNameAndUnit('Cu')}</th>
							<th>{getNutritionNameAndUnit('Mg')}</th>
							<th>{getNutritionNameAndUnit('Se')}</th>
							<th>{getNutritionNameAndUnit('Zn')}</th>
						</tr>
					</thead>
					<tbody>
						{foods}
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>{totalNutritionalValue('P')}</td>
							<td>{getRecommendedValue('I')}</td>
							<td>{getRecommendedValue('Fe')}</td>
							<td>{getRecommendedValue('Ca')}</td>
							<td>{getRecommendedValue('K')}</td>
							<td>{getRecommendedValue('Cu')}</td>
							<td>{getRecommendedValue('Mg')}</td>
							<td>{getRecommendedValue('Se')}</td>
							<td>{getRecommendedValue('Zn')}</td>
						</tr>

					</tbody>
				</table>
				<Button name="visa innehåll" handleClick={this.handleClick}/>
			</div>
		)
	}
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

export default Table;