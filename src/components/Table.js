import React, { Component } from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import TableRow from './TableRow';
import Button from './Button';


class Table extends Component {

	render() {

		const { handleChange, onFocus, foodArray, resultArray, activeIndex } = this.props;

		const foods = this.props.foodArray.map((item, index) => {
			return <TableRow
				key={index}
				index={index}
				amount={item.amount}
				type={item.type}
				name={item.name}
				handleChange={handleChange}
				onFocus={onFocus}
				ingredients={foodArray}
				result={resultArray[index]}
				activeIndex={activeIndex}
			/>
		})

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Volym</th>
							<th>Mått</th>
							<th>Ingredienser</th>
							<th>Sökresultat</th>
						</tr>
					</thead>
					<tbody>
						{foods}
					</tbody>
				</table>
				<Button name="visa innehåll" handleClick={this.handleClick}/>
			</div>
		)
	}
}

// export const foodListNutritions = gql`
// query Food {
//   Food(livsmedelsverketId: 4) {
//     id
//     livsmedelsverketId
//     name
//     nutritions
//   }
// }
//`

export default Table;