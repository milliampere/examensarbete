import React from 'react';
import './DropDownMenu.css';


const DropDownMenu = (props) => {

	const { indexInput, name, result, onChange, onFocus, activeIndex } = props;

	let results = '';
	if(result) {
		results = result.map((item, index) => {
			if(index < 10) {
				return <li className="dropdown-item" key={index} onClick={(e) => onChange(item['item'].name, indexInput, 'name', 'selected')}>{item['item'].name}</li>
			}else { return null }
		})
	}else {results = <li className="dropdown-no-item">Vi hittade ingen match, skriv in en annan råvara.</li>}

	return (
		<div className="dropdown" onFocus={(e) => onFocus(e, indexInput, 'type')}>
			<input className='input-large' type='text' value={name} onChange={(e) => onChange(e.target.value, indexInput, 'name', 'newInput')} ></input>
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

export default DropDownMenu;