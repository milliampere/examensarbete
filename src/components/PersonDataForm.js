import React, { Component } from 'react';
import './PersonDataForm.css';


export default class PersonDataForm extends Component {

    state = {
		sex: '',
		isPregnant: false,
		isBreastfeeding: false,
		lengthCm: '',
		weightKg: '',
		ageYear: '',
        PAL: '',    // physical activity level
        formErrors: {lengthCm: '', weightKg: '', ageYear: ''},
        lengthCmValid: false,
        weightKgValid: false,
        ageYearValid: false,
        formValid: false
    }

    componentDidMount() {

    }

    onChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value},
            () => { this.validateField(name,value) } // validation callback
        )
    }

    validateField(inputName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let {ageYearValid, lengthCmValid, weightKgValid} = this.state;

        switch(inputName) {
            case 'ageYear':
                ageYearValid = value.match(/^([1][8-9]|[2-9][0-9]|[1][0-1][0-9])$/i);   //18-119
                fieldValidationErrors.ageYear = ageYearValid ? '' : ' Ogiltig ålder (>18 år)';
                break;
            case 'lengthCm':
                lengthCmValid = value.match(/^([1-2][0-9][0-9])$/i);    // 100-299
                fieldValidationErrors.lengthCm = lengthCmValid ? '': ' Ogiltig längd';
                break;
            case 'weightKg':
                weightKgValid = value.match(/^([4-9][0-9]|[1-2][0-9][0-9])$/i);     // 30-299
                fieldValidationErrors.weightKg = weightKgValid ? '': ' Ogiltig vikt';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            ageYearValid: ageYearValid,
            lengthCmValid: lengthCmValid,
            weightKgValid: weightKgValid
            }, this.validateForm);
      }

      validateForm() {
        this.setState({formValid: this.state.ageYearValid && this.state.lengthCmValid && this.state.weightKgValid});
      }



    render() {
        return (
            <form className="person-data-form" onSubmit={(e) => this.props.onSubmit(e, {...this.state})}>
                <button className="close-button" onClick={this.props.close}>Stäng</button>
                <div>
                    <p className="input-header">Kön:</p>
                    <select name="sex" value={this.state.sex} onChange={this.onChange}>
                        <option name='man' value='man'>Man</option>
                        <option name='woman' value='woman'>Woman</option>
                    </select>
                </div>
                <br/>
                <div>
                    <p className="input-header">Ålder:</p>
                    <input type="text" name="ageYear" onChange={this.onChange} value={this.state.ageYear} placeholder="Ålder"></input>
                    {this.state.formErrors.ageYear}
                </div>
                <br/>
                <div>
                    <p className="input-header">Längd i cm:</p>
                    <input type="text" name="lengthCm" onChange={this.onChange} value={this.state.lengthCm} placeholder="Längd i cm"></input>
                    {this.state.formErrors.lengthCm}
                </div>
                <br/>
                <div>
                    <p className="input-header">Vikt i kg:</p>
                    <input type="text" name="weightKg" onChange={this.onChange} value={this.state.weightKg} placeholder="Vikt i kg"></input>
                    {this.state.formErrors.weightKg}
                </div>
                <br/>
                <div>
                    <p className="input-header">Fysisk aktivitet:</p>
                    <select id="PAL" name="PAL" value={this.state.PAL} onChange={this.onChange}>
                        <option name="PAL" value="1.15">Rullstolsburen eller sängliggande.</option>
                        <option name="PAL" value="1.4">Stillasittande arbete, lite fysikt fritidsaktivitet.</option>
                        <option name="PAL" value="1.65">Stillasittande arbete, träna några gånger i veckan.</option>
                        <option name="PAL" value="1.85">Huvudsakligen stående arbete.</option>
                        <option name="PAL" value="2.2">Tungt kroppsarbete eller mycket hög fritidsaktivitet</option>
                    </select>
                </div>
                <br/>
                {this.state.formValid ? <input className="save-button" type="submit" value="Spara" />
                : <input className="save-button disabled" type="submit" value="Spara" disabled /> }

            </form>
            )
    }
}
