import React, { Component } from 'react';

export default class PersonDataForm extends Component {

    state = {
		sex: '',
		isPregnant: false,
		isBreastfeeding: false,
		lengthCm: '',
		weightKg: '',
		ageYear: '',
		PAL: '',    // physical activity level
    }

    componentDidMount() {

    }

    onChange = (event) => {
		this.setState({[event.target.name] : event.target.value})
    }


    render() {
        return (
            <form onSubmit={(e) => this.props.onSubmit(e, {...this.state})} className="personDataForm">
                <p>Kön:</p>
                <select name="sex" value={this.state.sex} onChange={this.onChange}>
                    <option name='man' value='man'>Man</option>
                    <option name='woman' value='woman'>Woman</option>
                </select>
                <br/>
                <div>
                    <p>Ålder:</p>
                    <input type="text" name="ageYear" onChange={this.onChange} value={this.state.ageYear} placeholder="Ålder"></input>
                </div>
                <br/>
                <div>
                    <p>Längd i cm:</p>
                    <input type="text" name="lengthCm" onChange={this.onChange} value={this.state.lengthCm} placeholder="Längd i cm"></input>
                </div>
                <br/>
                <div>
                    <p>Vikt i kg:</p>
                    <input type="text" name="weightKg" onChange={this.onChange} value={this.state.weightKg} placeholder="Vikt i kg"></input>
                </div>
                <br/>
                <p>Fysisk aktivitet:</p>
                <select id="PAL" name="PAL" value={this.state.PAL} onChange={this.onChange}>
                    <option name="PAL" value="1.15">Rullstolsburen eller sängliggande.</option>
                    <option name="PAL" value="1.4">Stillasittande arbete, lite fysikt fritidsaktivitet.</option>
                    <option name="PAL" value="1.65">Stillasittande arbete, träna några gånger i veckan.</option>
                    <option name="PAL" value="1.85">Huvudsakligen stående arbete.</option>
                    <option name="PAL" value="2.2">Tungt kroppsarbete eller mycket hög fritidsaktivitet</option>
                </select>
                <br/>
                <input className="btn btn-primary" type="submit" value="Spara" />
            </form>
            )
    }
}
