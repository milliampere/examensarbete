import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
//import allNutrients from './data/nutrientNames.json';
import'./TableHeaderRow.css';


const TableHeaderRow = (props) => {

    const { activeTab } = props;

    const selectOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((number, index) => {
        return <option value={number} key={index}>{number}</option>
    });

    const select =
        <select value={props.portions} selected={props.portions} onChange={props.handlePortionChange}>
            {selectOptions}
        </select>

    const inputHeaders = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        if(item === "Från receptet"){
            return (
                <div className="header-receipt" key={index}>{item}
                    <div className="header-tooltip"> ({props.portions} port)
                        <span className="header-tooltiptext-portions">
                            <b>Antal portioner</b>
                            <br/>Antal portioner hämtas från receptet. Vill du ändra detta, observera att dina eventuella ändringar i kolumnen "mängd" i tabellen kommer att förloras. <br />
                            {select}
                        </span>
                    </div>
                </div>
            )
        }
        else {
            return <div className="header-receipt" key={index}>{item}</div>
        }
    })

    if(props.data.loading) {
        return (
            <div className="table-header-row">
                {inputHeaders}
                <div className="header-nutrition-container"></div>
            </div>
        )
    }
    else {

    let headersArray = showNutritionHelpFunc(activeTab);
    const allNutrients = props.data.allNutrients; //db

    let nutritionsHeaders = <div></div>;

        nutritionsHeaders = headersArray.map((abbr, index) => {
            const oneNutrient = allNutrients.find((nutrient) => {
                return nutrient.abbreviation === abbr;
            });
            if(oneNutrient){
                const { name, unit, description, typeOfNutrient:type } = oneNutrient;
                let shortname;

                if(type === 'Standard' && name.length > 7){
                    shortname = name.substring(0,7) + "..";
                }
                else if(type === 'Mineral' && name.length > 3){
                    shortname = name.substring(0,3) + "..";
                }
                else if(type === 'Fat' && name.length > 13){
                    shortname = name.substring(0,13) + "..";
                }
                else if(type === 'Vitamin' && name.length > 3){
                    shortname = name.substring(0,3) + "..";
                }
                else {
                    shortname = name;
                };
                let tooltiptext = <div><b>{name} ({unit})</b><br />{description}</div>
                return (
                    <div className="header-nutrition" key={index}>
                        <div className="header-tooltip">{shortname}
                            <span className="header-tooltiptext">{tooltiptext}</span>
                        </div>
                    </div>
                )
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


