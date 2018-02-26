import React, { Component } from 'react';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
// import db from '../db.json'
// import Post from './Post.js'
import TableRow from './TableRow';
import Button from './Button';


class Table extends Component {

	state = {
		selectedFoodNames: [],
		selectedFood: [],
		activeIndex: -1,
	}

	handleClick = (event) => {
		console.log(event.target.name)
	}

	onFocus = (event, index, column) => {
		console.log('Focus', index);
		if(this.state.activeIndex !== index) {
			this.setState({activeIndex: index});
		}
		else{
			this.setState({activeIndex: -1});
		}
	}

	exitFocus = () => {
		this.setState({activeIndex: -1});
	}

	onClick = (event) => {
		//console.log('denna är klickad', event.target.innerHTML);

	}


	render() {

		const foods = this.props.foodArray.map((item, index) => {
			return <TableRow
				key={index}
				index={index}
				amount={item.amount}
				type={item.type}
				name={item.name}
				handleChange={this.props.handleChange}
				onClick={this.onClick}
				onFocus={this.onFocus}
				ingredients={this.props.foodArray}
				result={this.props.resultArray[index]}
				activeIndex={this.state.activeIndex}
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

export default Table