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
            //let newMatch = search(value, propsdataallFoods);  // new match, ex newValue="potatis" results in match = ([{item: [name: "potatis rå"]}{etc}])
            //if(newMatch.length){
                //this.updateStateItem(index, {name: newMatch[0]['item'].name, match: newMatch});
            //}
            // else {
            //     this.updateStateItem(index, {name: '*', match: newMatch});
            // }

             //Vi vill inte göra en ny sökning här o ta ut det första, när någon tryck på en produkt vill vi visa just den.
            this.updateStateItem(index, {name: value});
            this.setState({activeIndex: -1});
		}
        //if new value is typed in by user:
        else {
            if(column === 'type'){
                this.updateStateItem(index, {type: value});
            }
            else if (column === 'amount') {
                this.updateStateItem(index, {amount: value});
            }
            else if (column === 'name') {
                let newMatch = search(value, propsdataallFoods);  // new match, ex newValue="potatis" results in match = ([{item: [name: "potatis rå"]}{etc}])
                this.updateStateItem(index, {name: value, match: newMatch});
            }
        }
    }

    /**
     * Updates the state for all the input fields
     * @param {number} index - The index of the object.
     * @param {object} newEntries - The entries to change, {amount: '100', type: 'g'}
     */
    updateStateItem(index, newEntries) {

        const newItem = Object.assign({}, this.state.changableInputArray[index], newEntries);

        // use slice to copy unedited parts of the state
        this.setState({
            changableInputArray: [
                ...this.state.changableInputArray.slice(0,index),
                newItem,
                ...this.state.changableInputArray.slice(index+1)
            ]
        });
    }


    openDropDownMenu = (event, index, column) => {
        this.setState({activeIndex: index}, () => {
            document.addEventListener("click", this.closeDropDownMenu);
        });
    }

    closeDropDownMenu = (event) => {
        if(!event.target.matches('.input-large')){
            this.setState({activeIndex: -1}, () => {
                document.removeEventListener('click', this.closeDropDownMenu);
            })
        }
    }

    render() {

        const {rawInputArray, propsdataallFoods} = this.props;
        const {changableInputArray} = this.state;

        return (
            <div>
                { changableInputArray.length &&
                    <Table
                        rawInputArray={rawInputArray}
                        allFoods={propsdataallFoods}
                        handleChange={this.handleChange}
                        changableInputArray={this.state.changableInputArray}
                        handleFocus={this.openDropDownMenu}
                        activeIndex={this.state.activeIndex}
                    />
                }
            </div>
        );
    }
}

export default Content;




