import React, { Component } from 'react';
import Fuse from 'fuse.js';
import { clearTimeout, setTimeout } from 'timers';

let timeout;



class TextArea extends Component {

    state = {
        input: '',
        ingredients: []
    }

    componentDidMount() {
        this.setState({input: foodArray})
    }


    handleChange = (event) => {
        this.setState({input: event.target.value});
    }


    handle = () => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            console.log("Tiden är inne");
            const arrayOfFoods = this.separateRows(this.state.input);

                arrayOfFoods.map((row) => {
                    const name = this.identifyName(row);
                    this.search(name);
                    return row
                })

        }, 3000);

    }

    separateRows = () => {
        const arrayOfFoods = this.state.input.split("\n");
        return arrayOfFoods;
    }



    render() {

        return (
            <div>
                <textarea rows="4" cols="50" onChange={this.handleChange} onKeyUp={this.handle} value={this.state.input}  className="textarea"></textarea>
            </div>
        );
    }
};

export default TextArea;


