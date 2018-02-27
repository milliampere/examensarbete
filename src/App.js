import React, { Component } from 'react';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
import Table from './components/Table';
import Credits from './components/Credits';
import allFoods from './data/list.json'
import searchData from './utils/searchData';
import foodArray from './data/input'

class App extends Component {

	state = {
		ingredients: [],
		resultArray: [],
		activeIndex: -1,
	}

	componentDidMount() { //stoppa sen in datan från chorme.onmessage... kolla pluginet
		this.setState({ ingredients: foodArray })
		this.setState({resultArray: this.searchIngredientsFromDb(foodArray)});
	}

	handleChange = (event, index, column, newValue) => {
		if(newValue){
			const currentState = [...this.state.ingredients];
			currentState[index][column] = newValue;
			this.setState({ ingredients: currentState })
		}
		else if(!newValue){
			console.log(index);
			console.log(event.target.value);
			const currentState = [...this.state.ingredients];
			currentState[index][column] = event.target.value;
			this.setState({ ingredients: currentState })

			const currentResultState = [...this.state.resultArray];
			const newResult = this.searchIngredientsFromDb(event.target.value);
			console.log('NEW RESULT', newResult)
			currentResultState[index].push(newResult);
			console.log('NEW STATE???', currentResultState)
			this.setState({resultArray: currentResultState});
		}
		this.setState({activeIndex: -1});
		console.log('ING', this.state.ingredients)
		console.log('RES', this.state.resultArray)
	}

	searchIngredientsFromDb = (foodArray) => {
		console.log('Torsk???', typeof foodArray);
		let results = [];
		if( typeof foodArray === 'object' ) {
			for( let i of foodArray ) {
				results.push(searchData(i.name, allFoods));
			}
			return(results);
		}else if( typeof foodArray === 'string' ) {
			console.log('TORSKAR', searchData(foodArray, allFoods));
			results.push(searchData(foodArray, allFoods));
			return(results);
		}
	}


	onFocus = (event, index, column) => {
		console.log('fokus')
		if(this.state.activeIndex !== index) {
			this.setState({activeIndex: index});
		}
		else{
			this.setState({activeIndex: -1});
		}
	}

	render() {

		console.log('#########update');

		return (
			<div className="App">
				<Navigation selectedType={this.state.selectedType} />
				{this.state.resultArray.length &&
					<Table
						foodArray={this.state.ingredients}
						allFoods={allFoods}
						resultArray={this.state.resultArray}
						handleChange={this.handleChange}
						onClick={this.onFocus}
						activeIndex={this.state.activeIndex}
						onBlur={this.onFocus}
					/>
				}
				<Credits />
			</div>
		);
	}
}


//Get this list of foodnames and id:s when the plugin is activated (called when open)
/* export const allFoods = gql`
  query allFoods {
    allFoods {
      id
      name
    }
  }
` */

//export default graphql(allFoods)(App)
export default App;