import React, { Component } from 'react';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
import Table from './components/Table';
//import TextArea from './components/TextArea';
import Credits from './components/Credits';
//import { debug } from 'util';
import allFoods from './list.json'
import searchData from './utils/searchData';



const foodArray = [{ amount: "800", type: "g", name: "potatis", group: "potatis" },
{ amount: "200", type: "g", name: "halloumiost", group: "ost" },
{ amount: "2", name: "tomater", group: "grönsaker" },
{ amount: "4", name: "champinjonburgare", group: "färdigmat" },
{ amount: "4", name: "hamburgerbröd av surdeg", group: "bröd" },
{ amount: "2", type: "dl", name: "lätt crème fraiche med tacosmak", group: "crème fraiche" },
{ amount: "2", type: "tsk", name: "olja", group: "olja" },
{ name: "salt", group: "kryddor"  },
{ name: "peppar", group: "kryddor" }
]


class App extends Component {

	state = {
		ingredients: [],
		resultArray: [],
		activeIndex: -1,
	}

	componentDidMount() { //stoppa sen in datan från chorme.onmessage... kolla pluginet
		this.setState({ ingredients: foodArray })
		this.setState({resultArray: this.searchIngredientsFromDb(foodArray)});
		console.log(this.state.resultArray);
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

			const currentResultState = [...this.state.resultArray];
			const newResult = this.searchIngredientsFromDb(event.target.value);
			console.log('nytt sök',newResult);
			console.log('index', index, 'column', column)
			console.log(this.state.resultArray);
			//currentResultState[index] = newResult;
			//this.setState({resultArray: currentResultState});
		}
		this.setState({activeIndex: -1});
		console.log(this.state.resultArray);
	}

	searchIngredientsFromDb = (foodArray) => {
		let results = [];
		console.log('typeOF!!!', typeof foodArray)
		if( typeof foodArray === 'object' ) {
			console.log('hej');
			for( let i of foodArray ) {
				results.push(searchData(i.name, allFoods));
			}
			return(results);
		}else if( typeof foodArray === 'string' ) {
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

		//console.log('Result State', this.statet.resultArray);

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