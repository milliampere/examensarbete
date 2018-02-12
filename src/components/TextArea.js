import React, { Component } from 'react';
import Fuse from 'fuse.js';

class TextArea extends Component {

    state = {
        input: '',
        foodArray: []
    }


    handleChange = (event) => {
        this.setState({input: event.target.value});
        this.separateRows();

        this.state.foodArray.map((row) => {
            const name = this.identifyName(row);
            this.search(name);
            return row
        })
        
    }

    separateRows = () => {
        const arrayOfFoods = this.state.input.split("\n");
        this.setState({foodArray: arrayOfFoods});
    }

    identifyName = (string) => {

        const units = [
            "kilo", "kg", "gram", "g", "milligram", "mg", 
            "liter", "l", "deciliter", "dl", "centiliter", "cl", "milliliter", "ml",
            "matsked", "msk", "tesked", "tsk", "kryddmått", "krm", 
            "blad", "krukor", "kruka", "koppar", "kopp", "nypor", "nypa", "stycken", "st", "förpackning", "förpackningar", "förp", "klyftor", "klyfta"
        ];

        const unit = units.filter(unit => {
            return string.includes(" " + unit + " ");
        })

        if(unit.length > 0){
            const array = string.split(unit[0]); 
            return array[1];
        }
        else{
            return string;
        }
    }

    search = (name) => {

        const list = this.props.allFoods;

        var options = {
            shouldSort: true,
            tokenize: true,
            matchAllTokens: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "name"
            ]
        };

        var fuse = new Fuse(list, options); // "list" is the item array
        var result = fuse.search(name);
        console.log(result);
    }

    render() {

        return (
            <div>
                <textarea rows="4" cols="50" onChange={this.handleChange} placeholder="Ingredienser" value={this.state.foods}  className="textarea"></textarea>
            </div>
        );
    }
};

export default TextArea;