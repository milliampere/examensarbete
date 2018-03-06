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
const calculateNutritionResult = (changableInput, activeTab) => {
	const nutritionsAbbrArray = showNutritionHelpFunc(activeTab);
		const nutritionsResult = nutritionsAbbrArray.map((abbr, index) => {
		const nutrition = nutritionForOneFood.data.Food.nutritions.find((nutrient) => {
			return nutrient.abbreviation == abbr;
		});
		let convertedAmount = null;
		if(nutrition){
			convertedAmount = amountHelpFunc(changableInput, nutrition);
		}
		return {
			abbr: abbr,
			value: convertedAmount
		}
	})
	return nutritionsResult;
}


//loopa igenom allt för att kunna anropa calculateNutritionResult per row/index (inne i map)
const calculateNutritionResultForAllRows = (changableInputArray, activeTab) => {
	return changableInputArray.map((row) => {
		return calculateNutritionResult(row, activeTab);
	})
}


class Table extends Component {
	render() {

		const {
			rawInputArray,
			changableInputArray,
			activeTab,
		} = this.props;


		const rows = rawInputArray.map((rawInput, index) => {

			return <TableRow
				key={index}
				rawInput={rawInput}
				index={index}
				changableInput={changableInputArray[index]}
				calculatedNutritionResult={calculateNutritionResult(changableInputArray[index], activeTab)}
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
					/>
				</div>
			</div>
		)
	}
}

export default Table;


/* export default graphql(gql`
  query ($livsmedelsverketId: Int!) {
	name
	id
  }
`, {
  options: (props) => ({
    variables: {
		livsmedelsverketId: props.changableInputArray[0].livsmedelsverketId,
    },
  }),
})(Table); */
