import React, { Component } from 'react';
import TableHeaderRow from './TableHeaderRow.js';
import TableRow from './TableRow';
import Button from '.././Button/Button.js';
import './Table.css';

class Table extends Component {

	render() {

		const {
			rawInputArray,
			changableInputArray,
		} = this.props;

		const headButtons = ['standard', 'fettsyror', 'vitaminer (vattenlösliga)', 'vitaminer (fettlösliga)', 'mineraler'].map((item, index) => {
			return <Button key={index} name={item} handleClick={this.handleClick}/>
		})

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
				<div className="button-menu">
					{headButtons}
				</div>
				<div className="table-header">
					<TableHeaderRow activeTab={'minerals'}/>
				</div>
				<div className="table-body">
					{rows}
				</div>
			</div>
		)
	}
}

export default Table;
