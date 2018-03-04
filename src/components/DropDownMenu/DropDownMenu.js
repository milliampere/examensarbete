import React from 'react';
import './DropDownMenu.css';

const DropDownMenu = (props) => {

	const { indexInput, name, handleChange, handleFocus, activeIndex, changableInput, backgroundColor } = props;
	const result = props.changableInput['match'];

	let iconColor = '';

	if (changableInput.livsmedelsverketId !== undefined) {
		iconColor = 'green';
	}else {
		iconColor = 'red';
	}

	let results;

	// if any matching results
	if(result.length) {
		results = result.map((item, index) => {
			if(index < 10) {
				return <li className="dropdown-item" key={index} onClick={(e) => handleChange(item['item'].name, indexInput, 'name', 'selected', item['item'])}>{item['item'].name}</li>
			}else { return null }
		})
	}else {
		results = <li className="dropdown-no-item">Vi hittade ingen match, skriv in en annan råvara.</li>
	}

	return (
		<div className="dropdown" onFocus={(e) => handleFocus(e, indexInput, 'type')}>
			<span className='fa fa-check' style={{color: iconColor}}></span>
			<input className='input-large input-food' style={{backgroundColor: backgroundColor}} type='text' value={name} onChange={(e) => handleChange(e.target.value, indexInput, 'name', 'newInput')} ></input>
			{activeIndex === indexInput &&
				<div className='dropdown-container'>
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