import React, { Component } from 'react';
import TableHeader from './TableHeader.js';
import TableRow from './TableRow';
import Button from '.././Button/Button.js';
import './Table.css';

class Table extends Component {

	render() {

		const {
			rawInputArray,
			//allFoods,
			changableInputArray,
			handleChange,
			activeIndex,
			handleFocus,
			handleBlur
		} = this.props;

		const headButtons = ['standard', 'fettsyror', 'vitaminer (vattenlösliga)', 'vitaminer (fettlösliga)', 'mineraler'].map((item, index) => {
			return <Button key={index} name={item} handleClick={this.handleClick}/>
		})

		const headers = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
			return <TableHeader key={index} data={item}/>
		})

		const rows = rawInputArray.map((rawInput, index) => {
			return <TableRow
				rawInput={rawInput}
				key={index}
				index={index}
				changableInput={changableInputArray[index]}
				handleChange={handleChange}
				activeIndex={activeIndex}
				handleFocus={handleFocus}
				handleBlur={handleBlur}
			/>
		})

		return (
			<div>
				<div className="button-menu">
					{headButtons}
				</div>
				<table>
					<thead>
						<tr>
							{headers}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Table;



//import fakeProps1 from '../data/nutritionForOneFood';
//import fakeProps2 from '../data/woman31-60';
//import fakeProps3 from '../data/nutritionFor8Foods';

/*
	<th>{getNutritionNameAndUnit('P')}</th>
	<th>{getNutritionNameAndUnit('I')}</th>
	<th>{getNutritionNameAndUnit('Fe')}</th>
	<th>{getNutritionNameAndUnit('Ca')}</th>
	<th>{getNutritionNameAndUnit('K')}</th>
	<th>{getNutritionNameAndUnit('Cu')}</th>
	<th>{getNutritionNameAndUnit('Mg')}</th>
	<th>{getNutritionNameAndUnit('Se')}</th>
	<th>{getNutritionNameAndUnit('Zn')}</th> */

/*
	<td>{totalNutritionalValue('P')}</td>
	<td>{getRecommendedValue('I')}</td>
	<td>{getRecommendedValue('Fe')}</td>
	<td>{getRecommendedValue('Ca')}</td>
	<td>{getRecommendedValue('K')}</td>
	<td>{getRecommendedValue('Cu')}</td>
	<td>{getRecommendedValue('Mg')}</td>
	<td>{getRecommendedValue('Se')}</td>
	<td>{getRecommendedValue('Zn')}</td> */