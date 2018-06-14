/*global chrome*/
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Content from './components/Content';
import Navigation from './components/Navigation/Navigation';
import Credits from './components/Credits/Credits';
import PersonDataForm from './components/PersonDataForm.js';
import filterRiForPersonData from './utils/filterRiForPersonData.js';
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
	}

	componentDidMount() {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(
			  	tabs[0].id,
			  	{ type: 'reactInit' },
				(response) => {
					this.setState({rawInputArray: response.array})
					this.setState({portions: response.portions})
				}
			);
		});
		chrome.storage.sync.get(null, (result) => {
			if(result){
				const sex = result.sex ? result.sex : 'woman';
				const isPregnant = result.isPregnant ? result.isPregnant : false;
				const isBreastfeeding = result.isBreastfeeding ? result.isBreastfeeding : false;
				const lengthCm = result.lengthCm ? Number(result.lengthCm) : 170;
				const weightKg = result.weightKg ? Number(result.weightKg) : 65;
				const ageYear = result.ageYear ? Number(result.ageYear) : 30;
				const PAL = result.PAL ? Number(result.PAL) : 1.65;

				this.setState({
					sex,
					isPregnant,
					isBreastfeeding,
					lengthCm,
					weightKg,
					ageYear,
					PAL,
					personalGroup: filterRiForPersonData(sex, ageYear, isPregnant, isBreastfeeding)
				});
			}
		})
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

		chrome.storage.sync.set({ //Save it using the Chrome extension storage API.
			sex: input.sex,
			isPregnant: input.isPregnant,
			isBreastfeeding: input.isBreastfeeding,
			lengthCm: Number(input.lengthCm),
			weightKg: Number(input.weightKg),
			ageYear: Number(input.ageYear),
			PAL: Number(input.PAL),
		});
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
						<h4 style={{fontWeight: 400}}>Om du ser detta trots att du är inne på en receptsida, testa att uppdatera webbsidan och öppna pluginet igen.<br></br>Om problemt kvarstår:
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
						onClick={this.changePersonData}
						onSubmit={this.onSubmit}
						options={options}
						close={this.closePersonData}
						show={showPersonDataForm}
						personalGroup={personalGroup}
					/>
					<Credits sendEmail={this.sendEmail} />
				</div>
			);
		}
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