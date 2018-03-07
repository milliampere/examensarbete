import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js'

import'./TableHeaderRow.css';

const TableHeaderRow = (props) => {
    const { activeTab, allNutrients } = props;

    const inputHeaders = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="header-receipt" key={index}>{item}</div>
    })

    let headersArray = showNutritionHelpFunc(activeTab);

    const nutritionsHeaders = headersArray.map((abbr, index) => {
        const oneNutrient = allNutrients.find((nutrient) => {
            return nutrient.abbreviation === abbr;
        });
        if(oneNutrient){
            return <div className="header-nutrition" key={index}>{oneNutrient.name} <br></br> {oneNutrient.unit}</div>
        }
        else {
            return <div className="header-nutrition" key={index}></div>
        }
    })


    return (
        <div className="table-header-row">
            {inputHeaders}
            {nutritionsHeaders}
        </div>
    );
}

export default TableHeaderRow;