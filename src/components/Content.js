import React, { Component } from 'react';
import Table from './Table/Table';
import search from '../utils/searchData';
import propsdataallFoods from '../data/list.json'; /* change to db when finished (props.data.allFoods) */

class Content extends Component {

    state = {
        changableInputArray: [],
        activeIndex: -1
    }

    componentDidMount() {
        //Put raw input into input fields.
        const changableInputArray = [];
        this.props.rawInputArray.map((row) => {
            let match = search(row.name, propsdataallFoods);
            if(match.length){
                row = {...row, "name": match[0]['item'].name, "match": match}
            } else {
                row = {...row, "name": '*', "match": match}
            }
            return changableInputArray.push(row);
        })
        this.setState({changableInputArray});
    }

    handleChange = (value, index, column, type) => {
        const currentState = [...this.state.changableInputArray];
        currentState[index][column] = value;
        this.setState({ changableInputArray: currentState })
		//if new value is selected from dropdown menu:
		if(type === 'selected'){
			this.setState({activeIndex: -1});
		}
        //if new value is typed in by user:
        else if(type === 'newInput'){
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

        console.log('statet', this.state.changableInputArray);

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


