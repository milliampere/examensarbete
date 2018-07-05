import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TableHeaderRow from './TableHeaderRow.js';
import TableTotalRow from './TableTotalRow.js';
import TableRow from './TableRow';
import {findDbResult} from '../../utils/calculateNutritionHelpFunc.js';
import {isValidAmount, isValidUnit, hasConversion, useConversion, isMass, valuePerAmount} from '../../utils/amountHelpFunc';
import {convertToGram} from '../../utils/converter';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc';
import './Table.css';

class Table extends Component {

	getNutritionsData = (index) => {
		const { changableInputArray, data, activeTab } = this.props;
		const dataFromDb = findDbResult(data, changableInputArray[index]);
		let result, amountInGram;
		const {amount, type:unit, livsmedelsverketId} = changableInputArray[index];
		const {conversion, nutritions} = dataFromDb;

		// should calculate? amount, unit and ingredient must be correct
		if(livsmedelsverketId && isValidAmount(amount) && isValidUnit(unit) && (isMass(unit) || hasConversion(unit, conversion))){
			// konvertering
			if(isMass(unit)) {
				amountInGram = convertToGram(amount, unit);
			}
			else if(hasConversion(unit, conversion)){
				amountInGram = useConversion(amount, unit, conversion, hasConversion(unit, conversion));
			}

			// skapa array "nutritionData"
			const abbrArray = showNutritionHelpFunc(activeTab);
			const nutritionData = abbrArray.map((abbr) => {
				const foundNutrition = nutritions.find((nutrient) => {
					return nutrient.abbreviation === abbr;
				});
				return (foundNutrition ?
					{ abbr: abbr, value: valuePerAmount(foundNutrition.value, amountInGram) }  // valuePer100g, amountInGram
					:
					{ abbr: abbr, value: 0 }
				);
			})

			result = { array: nutritionData, error: false , errorMessage: '' }
		}
		else {
			let errorMessage = '';

			if(livsmedelsverketId && (isValidUnit(unit) || !isMass(unit) || !hasConversion(unit, conversion))){
				errorMessage = 'Måttet finns inte inlagt i databasen på detta livsmedel, skriv in mått i gram istället.';
			}
			result = { array: [], error: true, errorMessage: errorMessage };
		}
		return result;
	}

	getNutritionsDataForAllRows = () => {
		const { rawInputArray } = this.props;
		return rawInputArray.map((row, index) => {
			const nutritionData = this.getNutritionsData(index);
			return nutritionData.array;
		})
	}

	getUnitErrorMessage = (index) => {
		const nutritionData = this.getNutritionsData(index);
		return nutritionData.errorMessage;
	}

	render() {

		const {
			rawInputArray,
			changableInputArray,
			data   					// från db
		} = this.props;

		if(data.loading){ //if data is loading don't do the rest in this component
			return (
				<div className="table">
					<div className="table-header">
						<TableHeaderRow {...this.props}/>
					</div>
					<div className="table-body">
					</div>
					<div className="table-footer">
					</div>
				</div>
			)
		}

		let rows= '';
		rows = rawInputArray.map((rawInput, index) => {
			return <TableRow
				key={index}
				rawInput={rawInput}
				index={index}
				changableInput={changableInputArray[index]}
				nutritionsData={this.getNutritionsData(index)}
				unitErrorMessage={this.getUnitErrorMessage(index)}
				{...this.props}
			/>
		})

		return (
			<div className="table">
				<div className="table-header">
					<TableHeaderRow {...this.props}/>
				</div>
				<div className="table-body">
					{rows}
				</div>
				<div className="table-footer">
					<TableTotalRow
						calculatedNutritionResult={this.getNutritionsDataForAllRows()}
						{...this.props}
					/>
				</div>
			</div>
		)
	}
}

export const foodListNutritions = gql`
	query allFoods($livsmedelsverketIdForAllFoods: [Int!]){
		allFoods(filter: {livsmedelsverketId_in: $livsmedelsverketIdForAllFoods}){
			id
			name
			nutritions
			livsmedelsverketId
			conversion
		  }
	}
`

export default graphql(foodListNutritions,
	{
		options: ({livsmedelsverketIdArray}) => ({ variables: { livsmedelsverketIdForAllFoods: livsmedelsverketIdArray } }),
	}
)(Table);

