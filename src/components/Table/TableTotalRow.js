import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';

import'./TableTotalRow.css';

const TableTotalRow = (props) => {

    const { activeTab, calculatedNutritionResult } = props;

    function getNutritionsTotalsForOneAbbr(abbr, calculatedNutritionResult) {
        if(calculatedNutritionResult.length){
            const nutritionsTotalsForOneAbbr = calculatedNutritionResult.map((oneRow, index) => {
                if(oneRow.length){
                    const oneAbbrObject = oneRow.find(n => {
                        return n.abbr === abbr
                    })
                    if(oneAbbrObject.value >= 0 || oneAbbrObject.value !== null){
                        return oneAbbrObject.value;
                    }
                    else {
                        return 0
                    }
                }
                else{
                    return 0;
                }
            }).reduce((a, b) => {
                return a + b;
           }, 0)
        return nutritionsTotalsForOneAbbr;
        }
    }

    let abbrArray = showNutritionHelpFunc(activeTab);
    const nutritionsTotals = abbrArray.map((abbr, index) => {
        return <div className="total-nutrition" key={index}>{getNutritionsTotalsForOneAbbr(abbr, calculatedNutritionResult).toFixed(2)}</div>;
    })

    const emptyForInputs = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="total-receipt" key={index}></div>
    })

    return (
        <div className="table-total-row">
            {emptyForInputs}
            {nutritionsTotals}
        </div>
    );
}


export default (TableTotalRow);