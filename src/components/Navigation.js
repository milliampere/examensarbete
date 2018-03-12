import React from 'react';
import Button from './Button/Button.js';
import './Navigation.css';

const Navigation = (props) => {

    const tabs = [
        {
            sv: 'Standard',
            eng: 'standard'
        },
        {
            sv: 'Fettsyror',
            eng: 'fat'
        },
        {
            sv: 'Vitaminer',
            eng: 'vitamin'
        },
        {
            sv: 'Mineraler',
            eng: 'mineral'
        }
    ];

    const headButtons = tabs.map((item, index) => {
        return <div className="navigation-button"><Button key={index} name={item.sv} value={item.eng} activeButton={props.activeTab} onClick={props.onClick}/></div>
    })

    return (
        <div className="button-menu">
			{headButtons}
		</div>
    );
};

export default Navigation;