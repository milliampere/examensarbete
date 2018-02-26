import React, { Component } from 'react';
import './Button.css';


class DropDownMenu extends Component {

	state = {
		activeIndex: -1,
	}



	onFocus = (event, index, column) => {
		console.log('Focus', index);
		if(this.state.activeIndex === -1) {
			this.setState({activeIndex: index});
		}
		else{
			this.setState({activeIndex: -1});
		}
	}

	// exitFocus = () => {
	// 	this.setState({activeIndex: -1});
	// }

	onClick = (event) => {
		//console.log('denna är klickad', event.target.innerHTML);

	}

	render(){

		const { indexInput, name, ingredients, result, onChange, onClick, onFocus, activeIndex, onBlur } = this.props;


		let results = '';

		if(result) {
			results = result.map((item, index) => {
				if(index < 10) {
					return <li onClick={(e) => onChange(e, indexInput, 'name', item['item'].name)}>{item['item'].name}</li>
				}
			})
		}



		return (
			<div className="dropdown">
				<input className='input-large' type='text' value={name} onFocus={(e) => onFocus(e, indexInput, 'type')} onChange={(e) => onChange(e, indexInput, 'name')} onBlur={onBlur}></input>
				{activeIndex === indexInput &&
					<div id="myDropdown" className="dropdown-content">
						<ul>
							{results}
						</ul>
					</div>
				}
			</div>
		);
	}
}

export default DropDownMenu;