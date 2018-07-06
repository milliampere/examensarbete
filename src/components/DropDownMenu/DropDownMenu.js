import React from 'react';
import './DropDownMenu.css';

const onFocus = (event) => {
    event.target.select();
}

const DropDownMenu = (props) => {

	const { indexInput, name, handleChange, handleFocus, activeIndex, changableInput, backgroundColor } = props;

	let result = [];
	if(changableInput.hasOwnProperty('match')){
		result = changableInput['match'];
	}

	let noMatchColor = '';
	if (!changableInput.livsmedelsverketId) {
		noMatchColor = '#F5D2CB';
	}

	let results;
	if(result.length) { // if any matching results
		results = result.map((item, index) => {
			if(index < 10) {
				return <li className="dropdown-item" key={index} onClick={(e) => handleChange(item['item'].name[0], indexInput, 'name', 'selected', item['item'])}>{item['item'].name}</li>
			}else { return null }
		})
	}else {
		results = <li className="dropdown-no-item">Vi hittade ingen match, skriv in en annan råvara.</li>
	}

	return (
		<div className="dropdown" onFocus={(e) => handleFocus(e, indexInput, 'type')}>
			{/* <span className='fa fa-check icon' style={{color: iconColor}}></span> */}
			<div className='input-large-tooltip' style={{backgroundColor: name === '*' ? '#F5D2CB' : '#e5e6e8'}} >{name === '*' ? 'Vi hittade ingen match, skriv in en annan råvara.' : 'Klicka för fler alternativ eller skriv själv in en annan råvara.'}</div>
			<input className='input-large' style={{backgroundColor: noMatchColor ? noMatchColor : backgroundColor}} type='text' value={name} onChange={(e) => handleChange(e.target.value, indexInput, 'name', 'newInput')} onFocus={onFocus}></input>
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