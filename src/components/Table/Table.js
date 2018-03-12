import React, { Component } from 'react';
import TableHeaderRow from './TableHeaderRow.js';
import TableTotalRow from './TableTotalRow.js';
import TableRow from './TableRow';
//import Button from '.././Button/Button.js';
import './Table.css';
//import nutritionForOneFood from '../../data/nutritionForOneFood.json';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
import amountHelpFunc from '../../utils/amountHelpFunc.js';
import {findDbResult, calculateNutritionResult, calculateNutritionResultForAllRows } from '../../utils/calculateNutritionHelpFunc.js';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'



class Table extends Component {
	render() {

		const {
			rawInputArray,
			changableInputArray,
			activeTab,
			options,
			personalGroup,
		} = this.props;

		//const data = {loading: false, allFoods: nutritionForOneFood}   // byt till databas
		const data = this.props.data;    // från db

		console.log(this.props.data.loading)

		let rows= '';
		if(!this.props.data.loading){
			rows = rawInputArray.map((rawInput, index) => {
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
		}

		return (
			<div className="table">
				<div className="table-header">
					<TableHeaderRow activeTab={this.props.activeTab} allNutrients={this.props.allNutrients}/>
				</div>
				<div className="table-body">
					{rows && rows}
				</div>
				<div className="table-footer">
					<TableTotalRow
						activeTab={this.props.activeTab}
						allNutrients={this.props.allNutrients}
						changableInputArray={changableInputArray}
						calculatedNutritionResult={calculateNutritionResultForAllRows(changableInputArray, activeTab, data)}
						options={options}
						personalGroup={personalGroup}
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
