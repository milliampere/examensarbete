import React, { Component } from 'react';
import Table from './Table/Table';
import search from '../utils/searchData';
import precisionRound from '../utils/precisionRound';
import { isValidUnit } from '../utils/amountHelpFunc';

class Content extends Component {

    state = {
        changableInputArray: [],
        activeIndex: -1
    }

    componentDidMount() {
        const { allFoodsData } = this.props;
        const initialChangableInputArray = this.props.rawInputArray.map((row) => { //Put raw input into input fields.
            const match = search(row.name, allFoodsData);
            if(match.length){
                return {
                    ...row,
                    name: match[0]['item'].name,
                    amount: precisionRound((row.amount/this.props.portions),1).toString(),
                    match: match, livsmedelsverketId: match[0]['item'].livsmedelsverketId,
                    validUnit: true,
                    validAmount: true,  // not used
                    validMatch: true
                }
            } else {
                return {...row,
                    name: '*',
                    amount: precisionRound((row.amount/this.props.portions),1),
                    match: match,
                    validUnit: true
                }
            }
        })
        this.setState({changableInputArray: initialChangableInputArray});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.portions !== this.props.portions){
            this.updateStateAmounts(this.props.rawInputArray, nextProps.portions);
        }
    }


    handleChange = (value, index, column, type, item) => {
        const { allFoodsData } = this.props;

		if(type === 'selected'){ // if new value is selected from dropdown menu
            let newMatch = search(value, allFoodsData);  // new match, ex newValue="potatis" results in match = ([{item: [name: "potatis rå"]}{etc}])
            this.updateStateItem(index, {[column]: value, match: newMatch, livsmedelsverketId: item.livsmedelsverketId});
            this.setState({activeIndex: -1});
        }
        else if (type === 'newInput') { // if new ingredient is typed in by user
            let newMatch = search(value, allFoodsData);  // new match, ex newValue="potatis" results in match = ([{item: [name: "potatis rå"]}{etc}])
            this.updateStateItem(index, {name: value, match: newMatch, livsmedelsverketId: null});
        }
        else if (column === 'type') { // if new volume or type is typed in by user
            this.updateStateItem(index, {[column]: value, validUnit: isValidUnit(value)});
        }
        else {
            this.updateStateItem(index, {[column]: value});
        }
    }


    /**
     * Updates the state for all the input fields
     * @param {number} index - The index of the object.
     * @param {object} newEntries - The entries to change, {amount: '100', type: 'g'}
     */
    updateStateItem(index, newEntries) {
        const newItem = Object.assign({}, this.state.changableInputArray[index], newEntries);
        // use slice to copy un-edited parts of the state
        this.setState({
            changableInputArray: [
                ...this.state.changableInputArray.slice(0,index),
                newItem,
                ...this.state.changableInputArray.slice(index+1)
            ]
        });
    }

    updateStateAmounts(array, portions) {
        portions = Number(portions); // convert to number to be able to use in calculation

        const newState = array.map((row, index) => {
            if(row.hasOwnProperty('amount')){
                let newAmount = precisionRound((Number(row.amount)/portions),1);  // convert to number to be able to calculate
                newAmount = newAmount.toString();  // convert back to string to fit input field
                return Object.assign({}, this.state.changableInputArray[index], {amount: newAmount});
            }
            else {  //if no amount in raw input field
                return Object.assign({}, this.state.changableInputArray[index], {amount: ''});
            }
        });
        this.setState({changableInputArray: newState});
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

        const { changableInputArray, activeIndex } = this.state;

        return (
            <div>
                {changableInputArray.length &&
                    <Table
                        handleChange={this.handleChange}
                        changableInputArray={changableInputArray}
                        handleFocus={this.openDropDownMenu}
                        activeIndex={activeIndex}
                        livsmedelsverketIdArray={changableInputArray.filter(changableInput => {return changableInput.livsmedelsverketId}).map((changableInput) => {return changableInput.livsmedelsverketId})}
                        {...this.props}
                    />
                }
            </div>
        );
    }
}

export default Content;




