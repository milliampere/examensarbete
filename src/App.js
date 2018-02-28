import React, { Component } from 'react';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
import Table from './components/Table/Table.js';
import Credits from './components/Credits';
//import allFoods from './data/list.json'
//import searchData from './utils/searchData';
//import foodArray from './data/input'

import propsdataallFoods from './data/list.json';
import rawInputArray from './data/input';
import Content from './components/Content';

class App extends Component {

	state = {
		activeTab: 1,
		portions: 4
	}
	componentDidMount() { //stoppa sen in datan från chorme.onmessage... kolla pluginet
/* 		this.setState({ ingredients: foodArray })
		this.setState({resultArray: this.searchIngredientsFromDb(foodArray)});
 */	}


	render() {

		return (
			<div className="App">
				<Navigation activeTab={this.state.activeTab} />
				<Content 
        			rawInputArray={rawInputArray}
					allFoods={propsdataallFoods} 
					portions={this.state.portions}
    			/> 
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