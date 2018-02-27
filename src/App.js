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
			const currentState = [...this.state.ingredients];
			currentState[index][column] = event.target.value;
			this.setState({ ingredients: currentState })
			//this.searchIngredientsFromDb(event.target.value); <-- här gäller det ju bara en produkt! fixa funktionen så det passar båda
		}
		this.setState({activeIndex: -1});
	}

	searchIngredientsFromDb = (foodArray) => {
		let resultArray = [];
		for (let i of foodArray) {
			resultArray.push(searchData(i.name, allFoods));
		}
		return(resultArray);
	}

	onFocus = (event, index, column) => {
		if(this.state.activeIndex !== index) {
			this.setState({activeIndex: index});
		}
		else{
			this.setState({activeIndex: -1});
		}
	}

	render() {

		return (
			<div className="App">
				<Navigation selectedType={this.state.selectedType} />
				{this.state.resultArray.length &&
					<Table
						foodArray={this.state.ingredients}
						allFoods={allFoods}
						resultArray={this.state.resultArray}
						handleChange={this.handleChange}
						onFocus={this.onFocus}
						activeIndex={this.state.activeIndex}
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