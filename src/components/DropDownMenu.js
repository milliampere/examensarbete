import React from 'react';
import './DropDownMenu.css';


const DropDownMenu = (props) => {

	const { indexInput, name, result, onChange, onFocus, activeIndex, onBlur } = props;

	let results = '';
	if(result) {
		results = result.map((item, index) => {
			if(index < 10) {
				return <li className="dropdown-item" key={index} onClick={(e) => onChange(e, indexInput, 'name', item['item'].name)} onFocus={(e) => onFocus(e, indexInput, 'type')}>{item['item'].name}</li>
			}else { return null }
		})
	}else {results = <li className="dropdown-item">Vi hittade ingen match, skriv in en anna råvara.</li>}

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

export default DropDownMenu;