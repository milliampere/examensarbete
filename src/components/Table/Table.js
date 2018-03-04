import React, { Component } from 'react';
import TableHeaderRow from './TableHeaderRow.js';
import TableRow from './TableRow';
import Button from '.././Button/Button.js';
import './Table.css';

class Table extends Component {

	state = {
		showNutritions: 'standard'
	}

	handleButtonClick = (event) => {
		this.setState({showNutritions: event.target.value});
	}

	render() {

		const { showNutritions } = this.state;

		const {
			rawInputArray,
			changableInputArray,
		} = this.props;

		const headButtons = ['standard', 'fettsyror', 'vitaminer', 'mineraler'].map((item, index) => {
			return <Button key={index} name={item} activeButton={showNutritions} handleClick={this.handleButtonClick}/>
		})

		const rows = rawInputArray.map((rawInput, index) => {
			return <TableRow
				key={index}
				rawInput={rawInput}
				index={index}
				changableInput={changableInputArray[index]}
				activeTab={showNutritions}
				{...this.props}
			/>
		})

		return (
			<div className="table">
				<div className="button-menu">
					{headButtons}
				</div>
				<div className="table-header">
					<TableHeaderRow activeTab={showNutritions}/>
				</div>
				<div className="table-body">
					{rows}
				</div>
			</div>
		)
	}
}

export default Table;
