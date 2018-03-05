import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js'
import'./TableHeaderRow.css';

const TableHeaderRow = (props) => {
    const { activeTab } = props;

    const inputHeaders = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="header-receipt" key={index}>{item}</div>
    })

    let headersArray = showNutritionHelpFunc(activeTab);

    const nutritionsHeaders = headersArray.map((abbr, index) => {
        return <div className="header-nutrition" key={index}>{abbr}</div>
    })

    return (
        <div className="table-header-row">
            {inputHeaders}
            {nutritionsHeaders}
        </div>
    );
}

export default TableHeaderRow;