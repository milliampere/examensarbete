import React, { Component } from 'react';
import TableHeaderRow from './TableHeaderRow.js';
import TableTotalRow from './TableTotalRow.js';
import TableRow from './TableRow';
//import Button from '.././Button/Button.js';
import './Table.css';
import nutritionForOneFood from '../../data/nutritionForOneFood.json';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
import amountHelpFunc from '../../utils/amountHelpFunc.js';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


//flyttat upp denna funktion och gort den mer generell för att får infon till alla behövande komponenter (tagen från nutritionData.js)
const calculateNutritionResult = (changableInput, activeTab, dataFromDb = {}) => {

	let nutritionsResult = {
		array: [],
		error: false,
		errorMess: 'loading'
	};

	// don't to the rest if no data or loading
 	if(Object.keys(dataFromDb).length === 0){
		return nutritionsResult;
	} 

	const nutritionsAbbrArray = showNutritionHelpFunc(activeTab);
	//const conversion = nutritionForOneFood.data.Food.conversion;  // byt till data från databasen
	const conversion = dataFromDb.conversion; // från db

	console.log(dataFromDb);

	if(changableInput.type === 'st') {
		if(conversion) {
			if(!conversion.gramPerPiece){
				nutritionsResult.error = true;
				nutritionsResult.errorMess = 'vi hittar inte vikt/st, skriv in mått i gram istället';
			}
		}
	}
	else if(changableInput.type === 'port'){
		if(conversion) {
			if(!(conversion.hasOwnProperty('gramPerPort'))){
				if(!conversion.gramPerPort){
					nutritionsResult.error = true;
					nutritionsResult.errorMess = 'vi hittar inte vikt/port, skriv in mått i gram istället';
				}
			}
		}
	}
	else if(changableInput.type === 'dl'){
		if(conversion) {
			if(!conversion.gramPerPort){
				nutritionsResult.error = true;
				nutritionsResult.errorMess = 'vi hittar inte vikt/port, skriv in mått i gram istället';
			}
		}
	}
	else {
		nutritionsResult.array = nutritionsAbbrArray.map((abbr, index) => {
			//const nutrition = nutritionForOneFood.data.Food.nutritions.find((nutrient) => {  // byt till data från databasen
			const nutrition = dataFromDb.nutritions.find((nutrient) => {   // <--- från db
				return nutrient.abbreviation === abbr;
			});

			let convertedAmount = null;
			if(nutrition){
				if(changableInput.amount >= 0){
					if(changableInput.type === 'st') {
						if(conversion.gramPerPiece){
							convertedAmount = amountHelpFunc(changableInput, nutrition, conversion);
						}
						else {
							convertedAmount = null;
						}
					}
					else if(changableInput.type === 'port'){
					}
					convertedAmount = amountHelpFunc(changableInput, nutrition, conversion);
				}else {
					convertedAmount = null;
				}
			}
			return {
				abbr: abbr,
				value: convertedAmount
			}
		})
		nutritionsResult.error = false;
		nutritionsResult.errorMess = '';
	}
	return nutritionsResult;
}


//loopa igenom allt för att kunna anropa calculateNutritionResult per row/index (inne i map)
const calculateNutritionResultForAllRows = (changableInputArray, activeTab) => {
	return changableInputArray.map((row) => {
		return calculateNutritionResult(row, activeTab).array;
	})
}

function findDbResult(data, changableInput) {
	let dataFromDb = {}
	if(!data.loading){
		dataFromDb = data.allFoods.find((food) => {return food.livsmedelsverketId === changableInput.livsmedelsverketId})
		if(!dataFromDb){
			dataFromDb = {}
		}
	} 
	else {
		dataFromDb = {}
	}

	return dataFromDb
}


class Table extends Component {
	render() {

		const {
			rawInputArray,
			changableInputArray,
			activeTab,
			options,
		} = this.props;

		//const data = {loading: true}   // byt till databas
		const data = this.props.data;    // från db

		const rows = rawInputArray.map((rawInput, index) => {

			let dataFromDb = findDbResult(data, changableInputArray[index]);

			return <TableRow
				key={index}
				rawInput={rawInput}
				index={index}
				changableInput={changableInputArray[index]}
				calculatedNutritionResult={calculateNutritionResult(changableInputArray[index], activeTab, dataFromDb)}
				dataFromDb={dataFromDb}
				{...this.props}
			/>
		})

		return (
			<div className="table">
				<div className="table-header">
					<TableHeaderRow activeTab={this.props.activeTab} allNutrients={this.props.allNutrients}/>
				</div>
				<div className="table-body">
					{rows}
				</div>
				<div className="table-footer">
					<TableTotalRow
						activeTab={this.props.activeTab}
						allNutrients={this.props.allNutrients}
						changableInputArray={changableInputArray}
						calculatedNutritionResult={calculateNutritionResultForAllRows(changableInputArray, activeTab)}
						options={options}
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

//export default Table;    // byt till databas
