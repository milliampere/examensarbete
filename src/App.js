import React, { Component } from 'react';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
import Table from './components/Table';
//import TextArea from './components/TextArea';
import Credits from './components/Credits';
//import { debug } from 'util';
import allFoods from './nameList.json'
import searchData from './utils/searchData';



const foodArray = [{ amount: "800", type: "g", name: "frysta potatisklyftor" },
	{ amount: "200", type: "g", name: "halloumiost" },
	{ amount: "2", name: "tomater" },
	{ amount: "4", name: "champinjonburgare" },
	{ amount: "4", name: "hamburgerbröd av surdeg" },
	{ amount: "2", type: "dl", name: "lätt crème fraiche med tacosmak" },
	{ amount: "2", type: "tsk", name: "olja" },
	{ name: "salt" },
	{ name: "peppar" }
]


class App extends Component {

	state = {
		ingredients: []
	}

	componentDidMount() { //stoppa sen in datan från chorme.onmessage... kolla pluginet
		this.setState({ ingredients: foodArray })
		//searchIngredientsFromDb(foodArray);
	}

	handleChange = (event, index, column) => {
		const currentState = [...this.state.ingredients];
		currentState[index][column] = event.target.value;
		this.setState({ ingredients: currentState })
		//searchIngredientsFromDb(event.target.value); <-- här gäller det ju bara en produkt! fixa funktionen så det passar båda
	}

	searchIngredientsFromDb = (foodArray) => {
		for (let i of foodArray) {
			console.log(i.name + searchData(i.name, allFoods));
		}
	}



	render() {

		return (
			<div className="App">
				<Navigation selectedType={this.state.selectedType} />
				<Table foodArray={this.state.ingredients} allFoods={allFoods} handleChange={this.handleChange} />
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