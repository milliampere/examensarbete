import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
//import allNutrients from './data/nutrientNames.json';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import'./TableHeaderRow.css';


const TableHeaderRow = (props) => {

    const { activeTab } = props;

    const inputHeaders = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="header-receipt" key={index}>{item}</div>
    })

    if (props.data.loading) {
        return (
        <div className="table-header-row">
            {inputHeaders}
            <div className="header-nutrition-container"></div>
        </div>)
    }
    else {
    
    let headersArray = showNutritionHelpFunc(activeTab);

    //const loading = false
    const allNutrients = props.data.allNutrients; //db
    //const loading = props.data.loading;  //db
    
    let nutritionsHeaders = <div></div>;

    //if(!loading){

        nutritionsHeaders = headersArray.map((abbr, index) => {
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

                let tooltiptext = <div><b>{name} ({unit})</b><br />{description}</div>

                return <div className="header-nutrition" key={index}><div className="header-tooltip">{shortname}<span className="header-tooltiptext">{tooltiptext}</span></div></div>
            }
            else {
                return <div className="header-nutrition" key={index}></div>
            }
        })

    //} 

    return (
        <div className="table-header-row">
            {inputHeaders}
            <div className="header-nutrition-container">{nutritionsHeaders}</div>
        </div>
    );
    }   
}

export const allNutrients = gql`query allNutrients {
	allNutrients{
		name
		unitforRI
		unit
		typeOfNutrient
		abbreviation
		description
	}
}`

export default graphql(allNutrients)(TableHeaderRow);

//export default TableHeaderRow;

