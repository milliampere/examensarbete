import React from 'react';
import './DropDownMenu.css';

const DropDownMenu = (props) => {

	const { index, name, onChange, onFocus, activeIndex } = props;
	const result = props.changableInput['match'];

	let results;

	// if any matching results
	if(result.length) {
		results = result.map((item, index) => {
			if(index < 10) {
				return <li className="dropdown-item" key={index} onClick={(e) => onChange(item['item'].name, index, 'name', 'selected')}>{item['item'].name}</li>
			}else { return null }
		})
	}else {
		results = <li className="dropdown-no-item">Vi hittade ingen match, skriv in en annan råvara.</li>
	}

	return (
		<div className="dropdown" onFocus={(e) => onFocus(e, index, 'type')}>
			<input className='input-large' type='text' value={name} onChange={(e) => onChange(e.target.value, index, 'name', 'newInput')} ></input>
			{activeIndex === index &&
				<div id="myDropdown" className="dropdown-content">
					<ul>
						{results}
					</ul>
				</div>
			}
		</div>
	);
}

export default DropDownMenu;