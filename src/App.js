import React, { Component } from 'react';
import './App.css';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
//import Table from './components/Table/Table.js';
import Credits from './components/Credits/Credits';
//import allFoods from './data/list.json'
//import searchData from './utils/searchData';
//import foodArray from './data/input'
import propsdataallFoods from './data/list.json';
import propsdataallNutrients from './data/nutrientNames.json';
import rawInputArray from './data/input';
import Content from './components/Content';

class App extends Component {

	state = {
		activeTab: 'standard',
		portions: 4,
	}
	componentDidMount() { //stoppa sen in datan från chorme.onmessage... kolla pluginet
/* 		this.setState({ ingredients: foodArray })
		this.setState({resultArray: this.searchIngredientsFromDb(foodArray)});
 */	}

	handleButtonClick = (event) => {

		this.setState({activeTab: event.target.value});
	}


	render() {


		return (
			<div className="App">
				<Navigation
					activeTab={this.state.activeTab}
					allNutrients={propsdataallNutrients}
					handleClick={this.handleButtonClick}
				/>
				<Content
        			rawInputArray={rawInputArray}
					allFoods={propsdataallFoods}
					portions={this.state.portions}
					allNutrients={propsdataallNutrients}
					activeTab={this.state.activeTab}    			/>
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

/* const allNutrientNames = gql`
	query allNutrient {
		allNutrients{
			name
			abbreviation
			unitforRI
			typeOfNutrient
		}
	}
` */

//export default graphql(allFoods)(App)
//export default graphql(allNutrientNames)(App)
export default App;