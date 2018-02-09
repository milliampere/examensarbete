import React, { Component } from 'react';

class TextArea extends Component {

    state = {
        input: '',
        foodArray: []
    }

    handleChange = (event) => {
        this.setState({input: event.target.value});
        this.separateRows();
    }


    separateRows = () => {
        const arrayOfFoods = this.state.input.split("\n");
        console.log(arrayOfFoods);
        this.setState({foodArray: arrayOfFoods});
    }


    render() {

        console.log(this.state.foodArray);

        return (
            <div>
                <textarea rows="4" cols="50" onChange={this.handleChange} placeholder="Ingredienser" value={this.state.foods}  className="textarea"></textarea>
            </div>
        );
    }
};

export default TextArea;