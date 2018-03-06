import React, { Component } from 'react';
import TableHeaderRow from './TableHeaderRow.js';
import TableTotalRow from './TableTotalRow.js';
import TableRow from './TableRow';
//import Button from '.././Button/Button.js';
import './Table.css';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Table extends Component {

	render() {

		const {
			rawInputArray,
			changableInputArray,
		} = this.props;

		const rows = rawInputArray.map((rawInput, index) => {
			return <TableRow
				key={index}
				rawInput={rawInput}
				index={index}
				changableInput={changableInputArray[index]}
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
					<TableTotalRow activeTab={this.props.activeTab} allNutrients={this.props.allNutrients} changableInputArray={changableInputArray}/>
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
