import React, { Component } from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
// import db from '../db.json'
// import Post from './Post.js'
import TableRow from './TableRow';


class Table extends Component {

	state = {
		selectedFoodNames: [],
		selectedFood: [],
	}

	render() {

		const foods = this.props.foodArray.map((item, index) => {
			//let searchAnswer = searchData(item.name, this.props.allFoods);
			return <TableRow key={index} index={index} amount={item.amount} type={item.type} name={item.name} handleChange={this.props.handleChange} ingredients={this.props.foodArray} />
		})


		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Volym</th>
							<th>Mått</th>
							<th>Ingredienser</th>
						</tr>
					</thead>
					<tbody>
						{foods}
					</tbody>
				</table>
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

export default Table