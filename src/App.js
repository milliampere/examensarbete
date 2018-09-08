/*global chrome*/
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Content from './components/Content';
import Navigation from './components/Navigation/Navigation';
import Credits from './components/Credits/Credits';
import Help from './components/Help/Help';
import PersonDataForm from './components/PersonDataForm.js';
import filterRiForPersonData from './utils/filterRiForPersonData.js';
import useRegex from './utils/regex.js';
import mockFoodList from './data/mockFoodList.json';
import './App.css';


class App extends Component {

	state = {
		portions: 1,
		sex: 'woman',
		isPregnant: false,
		isBreastfeeding: false,
		lengthCm: 170,
		weightKg: 65,
		ageYear: 30,
		PAL: 1.65, // physical activity level
		personalGroup: '',
		activeTab: 'standard',
		showPersonDataForm: false,
		showHelp: false,
		showCredits: false,
		textarea: '2 st tomat \n 1 st morot',
		rawInputArray: [],
	}

	componentDidMount() {
		this.setState({personalGroup: filterRiForPersonData(this.state.sex, this.state.ageYear, this.state.isPregnant, this.state.isBreastfeeding)});

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
		// 	if(result){
		// 		const sex = result.sex ? result.sex : 'woman';
		// 		const isPregnant = result.isPregnant ? result.isPregnant : false;
		// 		const isBreastfeeding = result.isBreastfeeding ? result.isBreastfeeding : false;
		// 		const lengthCm = result.lengthCm ? Number(result.lengthCm) : 170;
		// 		const weightKg = result.weightKg ? Number(result.weightKg) : 65;
		// 		const ageYear = result.ageYear ? Number(result.ageYear) : 30;
		// 		const PAL = result.PAL ? Number(result.PAL) : 1.65;

		// 		this.setState({
		// 			sex,
		// 			isPregnant,
		// 			isBreastfeeding,
		// 			lengthCm,
		// 			weightKg,
		// 			ageYear,
		// 			PAL,
		// 			personalGroup: filterRiForPersonData(sex, ageYear, isPregnant, isBreastfeeding)
		// 		});
		// 	}
		// })

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

	sendEmail = () => {
		chrome.extension.getBackgroundPage().sendEmail();
	}

	handleHelpClick = () => {
        this.setState(prevState => ({
			showHelp: !prevState.showHelp,
			showCredits: false,
		}));
	}

	handleCreditsClick = () => {
        this.setState(prevState => ({
			showCredits: !prevState.showCredits,
			showHelp: false,
		}));
    }

	handleTextarea = (event) => {
		this.setState({textarea: event.target.value});
	}

	handleTextareaButton = () => {

		const rawInputText = this.state.textarea; 
		const rawInputTextArray = rawInputText.split(/\n/g);
		
		const rawInputArray = rawInputTextArray.map((text) => {
				return useRegex(text);
		});

		console.log(rawInputArray);

		this.setState({rawInputArray: rawInputArray});
	}


	render() {

		const { portions, activeTab, personalGroup, showPersonDataForm, showHelp, showCredits } = this.state;
		//const { loading, allFoods } = this.props.data; //props from graphql
		const allFoods = mockFoodList.data.allFoods;
		const loading = false;

		const options = {
			sex: this.state.sex,
			isPregnant: this.state.isPregnant,
			isBreastfeeding: this.state.isBreastfeeding,
			lengthCm: this.state.lengthCm,
			weightKg: this.state.weightKg,
			ageYear: this.state.ageYear,
			PAL: this.state.PAL,
		}

		let gender = options.sex;
		let pregnantOrBreastfeeding = '';
		if(options.sex === 'woman'){
            gender = 'Kvinna'
			if(options.isPregnant){
				pregnantOrBreastfeeding = "(gravid)"
			}
			else if(options.isBreastfeeding){
				pregnantOrBreastfeeding = "(ammande)"
			}
        }

        let basedOnPerson = null;
        if(gender && options.ageYear) {
            basedOnPerson = `${gender} ${options.ageYear}år ${pregnantOrBreastfeeding}`;
        }

 		if(!this.state.rawInputArray){
			return (
				<div className="App">
					<h1 className="app-heading">Näringsberäknaren</h1>
					<div className="use-extension-info">
						<h3 style={{fontWeight: 300}}>Besök en receptsida på någon av följande webbplatser för att använda pluginet:</h3>
						<p>ica.se</p>
						<p>coop.se</p>
						<p>koket.se</p>
						<br></br>
						<h4 style={{fontWeight: 400}}>Om du ser detta trots att du är inne på en receptsida, testa att uppdatera webbsidan och öppna pluginet igen.<br></br>Om problemet kvarstår:
							<button className="contact_link" onClick={this.sendEmail}>kontakta oss</button>
						</h4>
					</div>
				</div>
			)
		}else {

			return (
				<div className="App">
					<div className="header-part">
						<h1 className="app-heading">Näringsberäknaren</h1>
						{!showPersonDataForm &&
							<Navigation
								activeTab={activeTab}
								onClick={this.handleButtonClick}
							/>
						}
					</div>
					<div>
						<textarea value={this.state.textarea} onChange={this.handleTextarea} cols="50" rows="10"></textarea>
						<button onClick={this.handleTextareaButton}>Hämta</button>
					</div>

					{!loading && !showPersonDataForm &&
						<Content
							rawInputArray={this.state.rawInputArray}
							//rawInputArray={rawInputArray}
							portions={portions}
							activeTab={activeTab}
							options={options}
							personalGroup={personalGroup}
							allFoodsData={allFoods}
							handlePortionChange={this.handlePortionChange}
						/>
					}
					<PersonDataForm
						// onClick={this.changePersonData}
						onSubmit={this.onSubmit}
						options={options}
						close={this.closePersonData}
						show={showPersonDataForm}
						personalGroup={personalGroup}
					/>
					<div className="info-part-buttons">
						{!showPersonDataForm &&
							<div className="persondata-container">
								{basedOnPerson && <p className="persondata-info">Nu visas datan baserat på: {basedOnPerson} </p>}
								{!basedOnPerson && <p>För att se resultat av rekommenderat intag:</p>}
								<button className="button-link" onClick={this.changePersonData}>Ändra persondata här!</button>
							</div>
						}
						{!showPersonDataForm &&
							<div className="info-part-buttons-end">
								<button onClick={this.handleHelpClick} className="help-button" style={{backgroundColor: showHelp ?  '#6f256f' : '#336B87'}}>{showHelp ? 'Dölj Hjälp & info' : 'Visa Hjälp & info'}</button>
								<button onClick={this.handleCreditsClick} className="credits-button" style={{backgroundColor: showCredits ?  '#6f256f' : '#336B87'}}>{showCredits ? 'Dölj Credits' : 'Visa Credits'}</button>
							</div>
						}
					</div>
					<div className="info-part">
						{showHelp && !showPersonDataForm && <Help sendEmail={this.sendEmail} />}
						{showCredits && !showPersonDataForm && <Credits sendEmail={this.sendEmail} />}
					</div>
				</div>
			);
		}
	}
}

// export const allFoods = gql`query allFoods {
// 	allFoods{
// 		id
// 		name
// 		group
// 		euroFirName
// 		livsmedelsverketId
// 	}
// }`

//export default graphql(allFoods)(App);

export default App;