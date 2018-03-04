import React, { Component } from 'react';
import './Credits.css';

class Credits extends Component {

    state = {
        showCredits: false
    }

    handleClick = () => {
        this.setState(prevState => ({
            showCredits: !prevState.showCredits
          }));
    }

    render() {

        const {showCredits} = this.state;

        return (
            <div>
                    <button onClick={this.handleClick} className="credits-button">{showCredits ? 'Dölj information' : 'Visa information'}</button>
                    {showCredits && 
                    <div className="credits-box">
                        <p>Näringsinformation kommer från Livsmedelsverkets livsmedelsdatabas (version 2017-12-15).</p>
                        <img src={ require('../../assets/graphcms.svg') } className="credits-graphcms-logo"/>
                    </div>}
            </div>
        );
    }
}

export default Credits;