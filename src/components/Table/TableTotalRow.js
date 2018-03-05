import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js'

import'./TableTotalRow.css';

const TableTotalRow = (props) => {
    const { activeTab, allNutrients } = props;

    const emptyForInputs = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="total-receipt" key={index}></div>
    })

    let totalsArray = showNutritionHelpFunc(activeTab);

    const nutritionsTotals = totalsArray.map((abbr, index) => {
        return <div className="total-nutrition" key={index}>{abbr}</div>
    })

    console.log(nutritionsTotals);

    return (
        <div className="table-total-row">
            {emptyForInputs}
            {nutritionsTotals}
        </div>
    );
}

export default TableTotalRow;