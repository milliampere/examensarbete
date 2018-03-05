import React from 'react';
import './Button.css';

const Button = (props) => {
    const { value, name, handleClick, activeButton } = props;

    let color = '#336B87';

    if(activeButton === value) {
        color = '#822b82';
    }

    return (
        <button className='button' style={{backgroundColor: color}} value={value} onClick={handleClick}>{name}</button>
    );
}
export default Button;