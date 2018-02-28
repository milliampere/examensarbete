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
        const initialChangableInputArray = [];
        this.props.rawInputArray.map((row) => {
            let match = search(row.name, propsdataallFoods);
            if(match.length){
                row = {...row, "name": match[0]['item'].name, "match": match}
            } else {
                row = {...row, "name": '*', "match": match}
            }
            return initialChangableInputArray.push(row);
        })
        this.setState({changableInputArray: initialChangableInputArray});
    }
  
    handleChange = (value, index, column, type) => {
		// if new value is selected from dropdown menu:
		if(type === 'selected'){
            this.updateStateItem(index, column, value);
            this.setState({activeIndex: -1});
		}
        //if new value is typed in by user:
        else if(type === 'newInput'){
            this.updateStateItem(index, column, value);
        }

    } 
    
    /** 
     * Updates the state for all the input fields
     * @param {number} index - The index of the object.
     * @param {string} key - The column object key ('amount' or 'type' or 'name).
     * @param {string} newValue - The input value.
     */
    updateStateItem(index, key, newValue) {

        // new match result from search, ex newValue="potatis" results in newMatch = ([{item: [name: "potatis rå"]}{etc}])
        let newMatch = search(newValue, propsdataallFoods);

        // use object assign to create a new object to put in state
        let newItem = Object.assign({}, this.state.changableInputArray[index], {[key]: newValue, match: newMatch});

        console.log(newItem);

        // use slice to copy unedited parts of the state
        this.setState({
            changableInputArray: [
                ...this.state.changableInputArray.slice(0,index),
                newItem,
                ...this.state.changableInputArray.slice(index+1)
            ]
        }, );
      }
 
 	searchIngredientFromDb = (name, index) => {
        const currentState = [...this.state.changableInputArray];
        currentState[index]['match'] = search(name, propsdataallFoods);
        this.setState({ changableInputArray: currentState })
    } 
    
    handleFocus = (event, index, column) => {
        if(this.state.activeIndex !== index) {
            this.setState({activeIndex: index});
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