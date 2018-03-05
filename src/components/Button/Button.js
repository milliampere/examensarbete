import React from 'react';
import './Button.css';

const Button = (props) => {
    const { name, handleClick, activeButton } = props;

    let color = '#336B87';

    if(activeButton === name) {
        color = '#822b82';
    }

    return (
        <button className='button' style={{backgroundColor: color}} value={name} onClick={handleClick}>{name}</button>
    );
}
export default Button;