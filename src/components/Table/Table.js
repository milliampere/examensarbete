import React, { Component } from 'react';
import TableHeader from './TableHeader.js';
import TableRow from './TableRow';
import Button from '.././Button/Button.js';
import './Table.css';

class Table extends Component {

	render() {

		const {
			rawInputArray,
			changableInputArray,
			handleChange,
			activeIndex,
			handleFocus,
			handleBlur
		} = this.props;

		const headButtons = ['standard', 'fettsyror', 'vitaminer (vattenlösliga)', 'vitaminer (fettlösliga)', 'mineraler'].map((item, index) => {
			return <Button key={index} name={item} handleClick={this.handleClick}/>
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
						<TableHeader activeTab={'minerals'}/>
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
