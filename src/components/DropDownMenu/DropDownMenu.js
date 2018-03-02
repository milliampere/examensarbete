import React from 'react';
import './DropDownMenu.css';

const DropDownMenu = (props) => {

	const { indexInput, name, onChange, onFocus, activeIndex, changableInput } = props;
	const result = props.changableInput['match'];

	console.log(props.changableInput.livsmedelsverketId)

	let backgroundColor = '';

	if (changableInput.livsmedelsverketId != undefined) {
		backgroundColor = 'green';
	}
	else {
		backgroundColor = 'red';
	}

	let results;

	// if any matching results
	if(result.length) {
		results = result.map((item, index) => {
			if(index < 10) {
				return <li className="dropdown-item" key={index} onClick={(e) => onChange(item['item'].name, indexInput, 'name', 'selected', item['item'])}>{item['item'].name}</li>
			}else { return null }
		})
	}else {
		results = <li className="dropdown-no-item">Vi hittade ingen match, skriv in en annan råvara.</li>
	}

	return (
		<div className="dropdown" onFocus={(e) => onFocus(e, indexInput, 'type')}>
			<div className="input">
				<span className='fa fa-check' style={{color: backgroundColor}}></span>
				<input className='input-large input-food' type='text' value={name} onChange={(e) => onChange(e.target.value, indexInput, 'name', 'newInput')} ></input>
			</div>
			{activeIndex === indexInput &&
				<div classname='dropdown-container'>
					<div id="myDropdown" className="dropdown-content">
						<ul>
							{results}
						</ul>
					</div>
				</div>

			}
		</div>
	);
}

export default DropDownMenu;