import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TableHeaderRow from './TableHeaderRow.js';
import TableTotalRow from './TableTotalRow.js';
import TableRow from './TableRow';
import {findDbResult, calculateNutritionResult, calculateNutritionResultForAllRows } from '../../utils/calculateNutritionHelpFunc.js';
import './Table.css';


class Table extends Component { //must be a react component to get graphgl data as props
	render() {

		const {
			rawInputArray,
			changableInputArray,
			activeTab,
		} = this.props;

		const data = this.props.data; // från db

		if(this.props.data.loading){ //if data is loading don't do the rest in this component
			return null;
		}

		let rows= '';
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


		return (
			<div className="table">
				<div className="table-header">
					<TableHeaderRow {...this.props}/>
				</div>
				<div className="table-body">
					{rows && rows}
				</div>
				<div className="table-footer">
					<TableTotalRow
						calculatedNutritionResult={calculateNutritionResultForAllRows(changableInputArray, activeTab, data)}
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

