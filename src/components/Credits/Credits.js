import React, { Component } from 'react';
import './Credits.css';

class Credits extends Component {

    componentDidMount() {
		window.scrollTo(0,document.body.scrollHeight);
    }

    componentWillUnmount() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className="credits">
                <p>Datan kommer från Livsmedelsverkets livsmedelsdatabas (version 2017-12-15) och publikationen Nordiska näringsrekommendationer.</p>
                <img src={ require('../../assets/graphcms.svg') } alt='graphCms logo' className="credits-graphcms-logo"/>
                <button className="contact_button" onClick={this.props.sendEmail}>Kontakta oss</button>
            </div>
        );
    }
}

export default Credits;