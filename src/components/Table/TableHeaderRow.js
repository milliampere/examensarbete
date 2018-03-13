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
        let shortname = '';
        if(oneNutrient){

            const {name, unit, description, typeOfNutrient:type }= oneNutrient;
            let shortname;
            
            if(type === 'Standard' && name.length > 5){
                shortname = name.substring(0,5) + "..";
            }
            else if(type === 'Mineral' && name.length > 3){
                shortname = name.substring(0,3) + "..";
            }
            else if(type === 'Fat' && name.length > 12){
                shortname = name.substring(0,12) + "..";
            }
            else if(type === 'Vitamin' && name.length > 3){
                shortname = name.substring(0,3) + "..";
            }
            else {
                shortname = name;
            };

            //let tooltiptext = <div>{name}<br />{description}</div>
            let tooltiptext = "HEJ"

            return <div className="header-nutrition" key={index}><div className="tooltip">{shortname}<span className="tooltiptext">{tooltiptext}</span></div></div>
        }
        else {
            return <div className="header-nutrition" key={index}></div>
        }
    })


    return (
        <div className="table-header-row">
            {inputHeaders}
            <div className="header-nutrition-container">{nutritionsHeaders}</div>
        </div>
    );
}

export default TableHeaderRow;