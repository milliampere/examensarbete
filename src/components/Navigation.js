import React from 'react';
import Button from './Button/Button.js';


const Navigation = (props) => {

    const tabs = [
        {
            sv: 'standard',
            eng: 'standard'
        },
        {
            sv: 'fettsyror',
            eng: 'fat'
        },
        {
            sv: 'vitaminer',
            eng: 'vitamin'
        },
        {
            sv: 'mineraler',
            eng: 'mineral'
        }
    ];

    const headButtons = tabs.map((item, index) => {
        return <Button key={index} name={item.sv} value={item.eng} activeButton={props.activeTab} onClick={props.onClick}/>
    })

    return (
        <div className="button-menu">
			{headButtons}
		</div>
    );
};

export default Navigation;