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
            <div className="credits">
                <button onClick={this.handleClick} className="credits-button" style={{backgroundColor: showCredits ?  '#6f256f' : '#336B87'}}>{showCredits ? 'Dölj information' : 'Visa information'}</button>
                {showCredits &&
                <div className="credits-box">
                    <p>Näringsinformation kommer från Livsmedelsverkets livsmedelsdatabas (version 2017-12-15). </p>
                    <img src={ require('../../assets/graphcms.svg') } alt='graphCms logo' className="credits-graphcms-logo"/>
                    <button className="contact_button" onClick={this.props.sendEmail}>Kontakta oss</button>
                </div>}
            </div>
        );
    }
}

export default Credits;