/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Credits from './components/Credits/Credits';
import propsdataallFoods from './data/list.json';
import propsdataallNutrients from './data/nutrientNames.json';
import filterRiForPersonData from './utils/filterRiForPersonData.js';
import rawInputArray from './data/input';
import Content from './components/Content';
import PersonDataForm from './components/PersonDataForm.js';
import Button from './components/Button/Button.js';

class App extends Component {

	state = {
		activeTab: 'standard',
		portions: 1,
		sex: 'woman',
		isPregnant: false,
		isBreastfeeding: false,
		lengthCm: '',
		weightKg: '',
		ageYear: '31',
		PAL: '',    // physical activity level
		personalGroup: '',
		showPersonDataForm: false,
	}

	componentDidMount() { //stoppa sen in datan från chorme.onmessage... kolla pluginet
		// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		// 	chrome.tabs.sendMessage(
		// 	  	tabs[0].id,
		// 	  	{ type: 'reactInit' },
		// 		(response) => { //arrowfunction isf en vanlig funktion gör att this är komponenten o inte window
		// 			this.setState({rawInputArray: response})
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
		// 		personalGroup: filterRiForPersonData(result.sex, result.ageYear)
		// 	});
		// 	console.log(result)
		// })
		//this.setState({personalGroup: filterRiForPersonData('woman', 30)})
		this.setState({portions: 4});
	}

	handleButtonClick = (event) => {
		this.setState({activeTab: event.target.value});
	}

	handlePortionChange = (event) => {
		//const answer = window.confirm("Detta kommer att återställa kolumnen 'Mängd' i tabellen. Vill du fortsätta?")   <- OBS, ska beräkningen göras på raw-input eller på fältet?
		const answer = true;

		if (answer) {
			this.setState({portions: Number(event.target.value)});
		} else {
			// Do nothing!
		}
	}

	optionsPage = () => {
		chrome.runtime.openOptionsPage()
	}

	onSubmit = (event, input) => {
		event.preventDefault(); //prevent the page to reload when the form is submitted

		console.log(input);

		this.setState({
			sex: input.sex,
			isPregnant: input.isPregnant,
			isBreastfeeding: input.isBreastfeeding,
			lengthCm: input.lengthCm,
			weightKg: input.weightKg,
			ageYear: input.ageYear,
			PAL: input.PAL,
		})

		this.setState({personalGroup: filterRiForPersonData(input.sex, input.ageYear)})

		// //Save it using the Chrome extension storage API.
		// chrome.storage.sync.set({
		// 	sex: this.state.sex,
		// 	isPregnant: this.state.isPregnant,
		// 	isBreastfeeding: this.state.isBreastfeeding,
		// 	lengthCm: this.state.lengthCm,
		// 	weightKg: this.state.weightKg,
		// 	ageYear: this.state.ageYear,
		// 	PAL: this.state.PAL,
		// }, function() {
		// 		// Update status to let user know options were saved.
		// 		console.log('sparat!')
		// 		setTimeout(function() {
		// 			console.log('something went wrong')
		// 	}, 750);
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

		const selectOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((number, index) => {
			return <option value={number} key={index}>{number}</option>
		});

		let gender = this.state.sex;
		if(this.state.sex === 'woman'){
			gender = 'Kvinna'
		}
		const basedOnPerson = `${gender} ${this.state.ageYear}år`;

		const options = {
			sex: this.state.sex,
			isPregnant: this.state.isPregnant,
			isBreastfeeding: this.state.isBreastfeeding,
			lengthCm: this.state.lengthCm,
			weightKg: this.state.weightKg,
			ageYear: this.state.ageYear,
			PAL: this.state.PAL,
		}

		return (
			<div className="App">
				{!this.state.showPersonDataForm &&
					<Navigation
						activeTab={this.state.activeTab}
						allNutrients={propsdataallNutrients}
						onClick={this.handleButtonClick}
					/>
				}
				<p>Antal portioner som receptet ska räcka till: {this.state.portions}</p>
				<select value={this.state.portions} selected={this.state.portions} onChange={this.handlePortionChange}>
					{selectOptions}
				</select>
				{/* {this.state.rawInputArray && !this.state.showPersonDataForm && */}
					<Content
						//rawInputArray={this.state.rawInputArray}
						rawInputArray={rawInputArray}
						allFoods={propsdataallFoods}
						portions={this.state.portions}
						allNutrients={propsdataallNutrients}
						activeTab={this.state.activeTab}
						options={options}
						personalGroup={this.state.personalGroup}
					/>
				{/* } */}
				<p>Nu visas datan baserat på: {basedOnPerson} </p>
				{!this.state.personalGroup &&
					<h4>För att se resultat av Rekommenderat intag, fyll i dina personliga uppgifter här:</h4>
				}
				<Button name="Ändra persondata" onClick={this.changePersonData}></Button>
				{this.state.showPersonDataForm &&
					<div>
						<PersonDataForm
							onSubmit={this.onSubmit}
							options={options}
							close={this.closePersonData}
						/>
					</div>
				}
				<Credits />
			</div>
		);
	}
}

export default App;