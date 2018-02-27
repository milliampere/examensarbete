import React, { Component } from 'react';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
import Table from './components/Table/Table.js';
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
		//SKULLE VI KUNNA SPARA BARA NAMNEN FRÅN RESULTATEN HÄR??
		this.setState({resultArray: this.searchIngredientsFromDb(foodArray)});
	}

	handleChange = (value, index, column, type) => {
		const currentState = [...this.state.ingredients];
		currentState[index][column] = value;
		this.setState({ ingredients: currentState });
		const currentResultState = [...this.state.resultArray];
		//if new value is selected from dropdown menu:
		if(type === 'selected'){
			//SKULLE VI KUNNA SPARA BARA NAMNEN FRÅN RESULTATEN HÄR?? SÅ KAN VI BARA STOPPA IN NYA VALUE ISF ATT SÖKA IGEN I DATABASEN FÖR ATT FÅ IN ALL INFO?
			const newResult = this.searchIngredientsFromDb(value);
			currentResultState[index] = newResult[0];
			this.setState({resultArray: currentResultState});
			this.setState({activeIndex: -1});
		}
		//if new value is typed in by user:
		else if(type === 'newInput'){
			const newResult = this.searchIngredientsFromDb(value);
			currentResultState[index] = newResult[0];
			this.setState({resultArray: currentResultState});
		}
	}

	searchIngredientsFromDb = (foodArray) => {
		let results = [];
		if( typeof foodArray === 'object' ) {
			for( let i of foodArray ) {
				results.push(searchData(i.name, allFoods));
			}
			console.log('resultat!!!!!!!!!!', results);
			return(results);
		}else if( typeof foodArray === 'string' ) {
			results.push(searchData(foodArray, allFoods));
			console.log('resultat!!!!!!!!!!', results);
			return(results);
		}
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