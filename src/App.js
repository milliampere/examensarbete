/*global chrome*/
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Content from './components/Content';
import Navigation from './components/Navigation/Navigation';
import Credits from './components/Credits/Credits';
import PersonDataForm from './components/PersonDataForm.js';
//import propsdataallFoods from './data/list.json'; //ersätt med data från GraphQL
import propsdataallNutrients from './data/nutrientNames.json'; //ersätt med data från GraphQL
import rawInputArray from './data/input'; //ersätt med data från chrome extension query...
import filterRiForPersonData from './utils/filterRiForPersonData.js';
import './App.css';


class App extends Component {

	state = {
		portions: 1,
		sex: 'woman',
		isPregnant: false,
		isBreastfeeding: false,
		lengthCm: 170,
		weightKg: 60,
		ageYear: 30,
		PAL: 1.65, // physical activity level
		personalGroup: '',
		activeTab: 'standard',
		showPersonDataForm: false,
	}

	componentDidMount() {
		// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		// 	chrome.tabs.sendMessage(
		// 	  	tabs[0].id,
		// 	  	{ type: 'reactInit' },
		// 		(response) => {
		// 			this.setState({rawInputArray: response.array})
		// 			this.setState({portions: response.portions})
		// 		}
		// 	);
		// });
		// chrome.storage.sync.get(null, (result) => {
		// 	this.setState({
		// 		sex: result.sex,
		// 		isPregnant: result.isPregnant,
		// 		isBreastfeeding: result.isBreastfeeding,
		// 		lengthCm: Number(result.lengthCm),
		// 		weightKg: Number(result.weightKg),
		// 		ageYear: Number(result.ageYear),
		// 		PAL: Number(result.PAL),
		// 		personalGroup: filterRiForPersonData(result.sex, Number(result.ageYear), result.isPregnant, result.isBreastfeeding)
		// 	});
		// })
		this.setState({personalGroup: filterRiForPersonData('woman', 30, false, false)}) //ta bort i slutversionen
		this.setState({portions: 4}); //ta bort i slutversionen
	}

	handleButtonClick = (event) => {
		this.setState({activeTab: event.target.value});
	}

	handlePortionChange = (event) => {
		const answer = true;
		if (answer) {
			this.setState({portions: Number(event.target.value)});
		}
	}

	//DENNA ANVÄNDS INTE TILL NÅGOT?! TA BORT???
	optionsPage = () => {
		chrome.runtime.openOptionsPage()
	}

	onSubmit = (event, input) => {
		event.preventDefault(); //prevent the page to reload when the form is submitted

		this.setState({
			sex: input.sex,
			isPregnant: input.isPregnant,
			isBreastfeeding: input.isBreastfeeding,
			lengthCm: Number(input.lengthCm),
			weightKg: Number(input.weightKg),
			ageYear: Number(input.ageYear),
			PAL: Number(input.PAL),
		})
		this.setState({personalGroup: filterRiForPersonData(input.sex, input.ageYear, input.isPregnant, input.isBreastfeeding)})

		// chrome.storage.sync.set({ //Save it using the Chrome extension storage API.
		// 	sex: input.sex,
		// 	isPregnant: input.isPregnant,
		// 	isBreastfeeding: input.isBreastfeeding,
		// 	lengthCm: Number(input.lengthCm),
		// 	weightKg: Number(input.weightKg),
		// 	ageYear: Number(input.ageYear),
		// 	PAL: Number(input.PAL),
		// });
		this.setState({showPersonDataForm: false})
	}

	changePersonData = () => {
		this.setState({showPersonDataForm: true})
	}

	closePersonData = () => {
		this.setState({showPersonDataForm: false})
	}


	render() {
		const { portions, activeTab, personalGroup, showPersonDataForm } = this.state;
		const { loading, allFoods } = this.props.data; //props from graphql

		const options = {
			sex: this.state.sex,
			isPregnant: this.state.isPregnant,
			isBreastfeeding: this.state.isBreastfeeding,
			lengthCm: this.state.lengthCm,
			weightKg: this.state.weightKg,
			ageYear: this.state.ageYear,
			PAL: this.state.PAL,
		}

 		// if(!this.state.rawInputArray){
		// 	return (
		// 		<div className="App">
		//			<h1 className="app-heading">Näringsberäknaren</h1>
		// 			<div className="use-extension-info">
		// 				<p>Besök någon av följande sidor för att använda pluginet</p>
		// 				<p>ica.se</p>
		// 				<p>coop.se</p>
		// 				<p>koket.se</p>
		// 			</div>
		// 		</div>
		// 	)
		// }else {

			return (
				<div className="App">
					<div className="header-part">
						<h1 className="app-heading">Näringsberäknaren</h1>
						{!showPersonDataForm &&
							<Navigation
								activeTab={activeTab}
								allNutrients={propsdataallNutrients} //ersätt med data från GraphQL
								onClick={this.handleButtonClick}
							/>
						}
					</div>
					{!loading && !showPersonDataForm &&
						<Content
							//rawInputArray={this.state.rawInputArray}
							rawInputArray={rawInputArray}
							portions={portions}
							allNutrients={propsdataallNutrients} //ersätt med data från GraphQL
							activeTab={activeTab}
							options={options}
							personalGroup={personalGroup}
							allFoodsData={allFoods}
							handlePortionChange={this.handlePortionChange}
						/>
					}
					<PersonDataForm
						onClick={this.changePersonData}
						onSubmit={this.onSubmit}
						options={options}
						close={this.closePersonData}
						show={showPersonDataForm}
						personalGroup={personalGroup}
					/>
					<Credits />
				</div>
			);
		// }
	}
}

export const allFoods = gql`query allFoods {
	allFoods{
		id
		name
		group
		euroFirName
		livsmedelsverketId
	}
}`

export default graphql(allFoods)(App);

//export default App;