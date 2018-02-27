import React, { Component } from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import Button from '../Button/Button';
import fakeProps1 from '../../data/nutritionForOneFood';
import fakeProps2 from '../../data/woman31-60';
import fakeProps3 from '../../data/nutritionFor8Foods';
import './Table.css'

class Table extends Component {

	render() {

		const { handleChange, onFocus, foodArray, resultArray, activeIndex, onBlur } = this.props;

		const headButtons = ['standard', 'fettsyror', 'vitaminer (vattenlösliga)', 'vitaminer (fettlösliga)', 'mineraler'].map((item, index) => {
			return <Button key={index} name={item} handleClick={this.handleClick}/>
		})

		const headers = ['Volym', 'Mått', 'Ingredienser', 'Sökresultat'].map((item, index) => {
			return <TableHeader key={index} data={item}/>
		})

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
				onBlur={onBlur}
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
			const total = fakeProps3.data.allFoods.map((food)=>{
				const nutrition = food.nutritions.find((nutrient) => { return nutrient.abbreviation === abbr});
				if(nutrition) { return nutrition.value }
				else { return 0 }
			});
			total.reduce((total, num) => {return total + num});
		};


		return (
			<div>
				<div className="button-menu">
					{headButtons}
				</div>
				<table>
					<thead>
						<tr>
							{headers}
							{/* mappa och filtrera listan med namn och returnera en const med <TableRow /> ?? isf nedan*/}
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
							{/*GÖR EN KOMPONEN SOM SKAPAR TABLE DATA TB SÅ VI SLIPPER SKRIVA UT ALLA SÅHÄR?
							mappa och filtrera listan med rek och returnera en const <TableRow />*/}
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