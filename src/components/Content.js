import React, { Component } from 'react';
import Table from './Table/Table';
import search from '../utils/searchData';
import propsdataallFoods from '../data/list.json'; /* change to db when finished (props.data.allFoods) */

class Content extends Component {

    state = {
        changableInputArray: [],
        activeIndex: -1
    }

    componentWillMount() {
        //Put raw input into input fields.
        const changableInputArray = [];
        this.props.rawInputArray.map((row) => {
            row = {...row, "match": []}
            changableInputArray.push(row);
        })
        this.setState({changableInputArray});
    }
  
    handleChange = (event, index, column, newValue) => {
		// newValue means that the value comes from one option in the dropdownmenu
		if(newValue){
			//const currentState = [...this.state.ingredients];
			//currentState[index][column] = newValue;
			//this.setState({ ingredients: currentState })
			//this.setState({activeIndex: -1});
		}
		// !newValue means that the value comes from the inputfield onChange, new input has been written and can be found in event.target.value
		else if(!newValue){
            const currentState = [...this.state.changableInputArray];
			currentState[index][column] = event.target.value;
            this.setState({ changableInputArray: currentState })
            this.searchIngredientFromDb(this.state.changableInputArray[index]['name'],index);
		}
	} 

 	searchIngredientFromDb = (name, index) => {
        const currentState = [...this.state.changableInputArray];
        currentState[index]['match'] = search(name, propsdataallFoods);
        this.setState({ changableInputArray: currentState })
    } 
    
    handleFocus = (event, index, column) => {
        if(this.state.activeIndex !== index) {
            this.setState({activeIndex: index});
            
            //this should only happen if the name input is altered and blured (or if alternative is clicked) (now happens every time we focus)
            this.searchIngredientFromDb(this.state.changableInputArray[index]['name'],index);
        }
        else{
            this.setState({activeIndex: -1});
        }
    } 

    handleBlur = (event, index, column) => {
        // things happen here
    } 
    
    render() {

        const {rawInputArray, propsdataallFoods} = this.props;
        const {changableInputArray} = this.state;
        
        return (
            <div>
                { changableInputArray.length && (
                    <Table
                        rawInputArray={rawInputArray}
                        allFoods={propsdataallFoods}
                        handleChange={this.handleChange}
                        changableInputArray={this.state.changableInputArray}
                        handleFocus={this.handleFocus}
                        handleBlur={this.handleBlur}
                        activeIndex={this.state.activeIndex}
                    />
                    )
                }

            </div>
        );
    }
}

export default Content;


/*
onFocus = (event, index, column) => {
    if(this.state.activeIndex !== index) {
        this.setState({activeIndex: index});
    }
    else{
        this.setState({activeIndex: -1});
    }
} */

/* 	searchIngredientsFromDb = (foodArray) => {
		let results = [];
		if( typeof foodArray === 'object' ) {
			for( let i of foodArray ) {
				results.push(searchData(i.name, allFoods));
			}
			return(results);
		}else if( typeof foodArray === 'string' ) {
			results.push(searchData(foodArray, allFoods));
			return(results);
		}
    } */
    

/* 	handleChange = (event, index, column, newValue) => {
		// newValue means that the value comes from one option in the dropdownmenu
		if(newValue){
			const currentState = [...this.state.ingredients];
			currentState[index][column] = newValue;
			this.setState({ ingredients: currentState })
			this.setState({activeIndex: -1});
		}
		// !newValue means that the value comes from the inputfield onChange, new input has been written and can be found in event.target.value
		else if(!newValue){
			const currentState = [...this.state.ingredients];
			currentState[index][column] = event.target.value;
			this.setState({ ingredients: currentState })

			const currentResultState = [...this.state.resultArray];
			const newResult = this.searchIngredientsFromDb(event.target.value);
			currentResultState[index] = newResult[0];
			this.setState({resultArray: currentResultState});
		}
	} */