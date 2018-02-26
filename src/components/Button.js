import React from 'react';
import './Button.css';

const Button = (props) => {

    const { name } = props;


    return (
        <button className='button' onClick={(e) => handleClick()}>name</button>
    );
}

export default Button;