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
                {/* <div> */}
                    <button onClick={this.handleClick} className="credits-button">{showCredits ? 'Dölj information' : 'Visa information'}</button>
                    {showCredits &&
                    <div className="credits-box">
                        <p>Näringsinformation kommer från Livsmedelsverkets livsmedelsdatabas (version 2017-12-15). </p>
                    {/* <p>Intaget av protein bör vara 10-15 energiintaget (E%).
                        Intaget av fett bör vara ca en tredjedel av energiintaget.
                        Intaget av kolhydrater bör vara 45-60 E%.
                        I beräkningarna är protein, fett och kolhydrater är baserat 12.5 E%, 33 E% respektive 54.5 E%.</p>
                        <p>Intaget av mättade fettsyror bör begränsas till mindre än 10 E%.</p>
                        <p>Intaget av enkelomättade fettsyror bör vara 10–20 procent av energiintaget
                        (E%). I beräkningarna visas rekommenderat intag för 15 E%. </p>
                        <p>Intaget av cis-fleromättade fettsyror bör vara 5–10 E%. I beräkningarna visas rekommenderat intag för 7.5 E%.  </p>
                        <p>Intag av kolesterol bör vara under 300 mg per dag. </p>
                        <p>Intaget av salt bör vara mindre än 6 g/dag.</p> */}
                        <img src={ require('../../assets/graphcms.svg') } alt='graphCms logo' className="credits-graphcms-logo"/>
                    </div>}
                {/* </div> */}
            </div>
        );
    }
}

export default Credits;