import React, { Component } from 'react';
import Table from './Table/Table';
import search from '../utils/searchData';
import propsdataallFoods from '../data/list.json'; /* change to db when finished (props.data.allFoods) */

class Content extends Component {

    state = {
        changableInputArray: [],
        activeIndex: -1
    }

    componentWillMount() { //ComponentDidMount??
        //Put raw input into input fields.
        const initialChangableInputArray = this.props.rawInputArray.map((row) => {
            const match = search(row.name, propsdataallFoods);
            if(match.length){
                return {...row, name: match[0]['item'].name, amount: row.amount/this.props.portions, match: match, livsmedelsverketId: match[0]['item'].livsmedelsverketId, validUnit: true}
            } else {
                return {...row, name: '*', amount: row.amount/this.props.portions, match: match, validUnit: true}
            }
        })
        this.setState({changableInputArray: initialChangableInputArray});
    }


    handleChange = (value, index, column, type, item) => {
		// if new value is selected from dropdown menu:
		if(type === 'selected'){
            let newMatch = search(value, propsdataallFoods);  // new match, ex newValue="potatis" results in match = ([{item: [name: "potatis rå"]}{etc}])
             //Vi vill inte göra en ny sökning här o ta ut det första, när någon tryck på en produkt vill vi visa just den.
            this.updateStateItem(index, {[column]: value, match: newMatch, livsmedelsverketId: item.livsmedelsverketId});
            this.setState({activeIndex: -1});
		}
        // if new ingredient is typed in by user:
        else if (type === 'newInput') {
            let newMatch = search(value, propsdataallFoods);  // new match, ex newValue="potatis" results in match = ([{item: [name: "potatis rå"]}{etc}])
            this.updateStateItem(index, {name: value, match: newMatch, livsmedelsverketId: null});
        }
        // if new volume or type is typed in by user:
        else if (column === 'type') {
            const regex = /^(kg|g|mg|l|dl|cl|ml|msk|tsk|krm|st|port)$/;
            if(regex.test(value))
            this.updateStateItem(index, {[column]: value, validUnit: true});
            else {
                this.updateStateItem(index, {[column]: value, validUnit: false});
            }
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

        const { rawInputArray, propsdataallFoods, options } = this.props;
        const { changableInputArray, activeIndex } = this.state;

        return (
            <div>
                { changableInputArray.length &&
                    <Table
                        rawInputArray={rawInputArray}
                        allFoods={propsdataallFoods}
                        handleChange={this.handleChange}
                        changableInputArray={changableInputArray}
                        handleFocus={this.openDropDownMenu}
                        activeIndex={activeIndex}
                        activeTab={this.props.activeTab}
                        allNutrients={this.props.allNutrients}
                        options={options}
                        livsmedelsverketIdArray={changableInputArray.filter(changableInput => {return changableInput.livsmedelsverketId}).map((changableInput) => {return changableInput.livsmedelsverketId})}
                    />
                }
            </div>
        );
    }
}

export default Content;




