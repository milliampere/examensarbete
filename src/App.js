import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Credits from './components/Credits/Credits';
import propsdataallFoods from './data/list.json';
import propsdataallNutrients from './data/nutrientNames.json';
import filterRiForPersonData from './utils/filterRiForPersonData.js';
import rawInputArray from './data/input';
import Content from './components/Content';

/*global chrome*/


class App extends Component {

	state = {
		activeTab: 'standard',
		portions: 4,
		options: {
			sex: 'woman',
			isPregnant: false,
			isBreastfeeding: false,
			lengthCm: 163,
			weightKg: 53,
			ageYear: 28,
			PAL: 1.4,    // physical activity level
		},
		personalGroup: '',
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
		// 		options: {
		// 			sex: result.sex,
		// 			isPregnant: result.isPregnant,
		// 			isBreastfeeding: result.isBreastfeeding,
		// 			lengthCm: result.lengthCm,
		// 			weightKg: result.weightKg,
		// 			ageYear: result.ageYear,
		// 			PAL: result.PAL,
		// 		},
		// 		personalGroup: filterRiForPersonData(result.sex, result.ageYear)
		// 	});
		// })

		this.setState({personalGroup: filterRiForPersonData('woman', 30)})
	}

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
				{/* {this.state.rawInputArray && */}
					<Content
						// rawInputArray={this.state.rawInputArray}
						rawInputArray={rawInputArray}
						allFoods={propsdataallFoods}
						portions={this.state.portions}
						allNutrients={propsdataallNutrients}
						activeTab={this.state.activeTab}
						options={this.state.options}
						personalGroup={this.state.personalGroup}
					/>
				{/* } */}
				<Credits />
			</div>
		);
	}
}

export default App;