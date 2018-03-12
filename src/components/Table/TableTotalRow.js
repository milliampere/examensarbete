import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
import {totalEnergyNeed} from '../../utils/optionCalculations.js'
import ri from '../../data/ri.json'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import'./TableTotalRow.css';

const TableTotalRow = (props) => {

    const { activeTab, calculatedNutritionResult, options, personalGroup } = props;
    //const data = props.data.allNutrients;
    const data = ri;
    //const loading = props.data.loading;
    const loading = false;

    function getNutritionsTotalsForOneAbbr(abbr, calculatedNutritionResult) {

        //console.log('getNutritionsTotalsForOneAbbr', calculatedNutritionResult)
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

    function standardCalc(value, abbr){
        //console.log('standardCalc', value)

        const { sex, weightKg, lengthCm, ageYear, PAL } = options;
        const total = totalEnergyNeed(sex, weightKg, lengthCm, ageYear, PAL)

        if(!loading){
            const nutritionObj = data.find((nutrition) => {
                return nutrition.abbreviation === abbr;
            })
            //console.log('object personalgroup', nutritionObj[personalGroup])

            const recommendedValue = nutritionObj[personalGroup];
            let decimal = 0;
            let kcalOfTotalGram = 0;
            const neededKcal = recommendedValue*0.01*total;

            if(abbr === 'Ener'){
                decimal = (value/total);
            }
            else {
                if (abbr === 'Prot' || abbr === 'Kolh'){
                    kcalOfTotalGram = value*4;
                }
                else if(abbr === 'Fett'){
                    kcalOfTotalGram = value*9;
                }
                else if(abbr === 'Fibe'){
                    kcalOfTotalGram = value*2;
                }
                decimal = kcalOfTotalGram/neededKcal;
            }
            return (decimal*100).toFixed(1) + '%';
        }else{
            return '';
        }
    }

    function allOtherCalc(value, abbr){
        if(!loading){
            const nutritionObj = data.find((nutrition) => {
                return nutrition.abbreviation === abbr;
            })
            const recommendedValue = nutritionObj[personalGroup];
            const recommendedUnit = nutritionObj['unitforRI'];

            if(recommendedValue){
                const decimal = value/recommendedValue;
                return (decimal*100).toFixed(1) + '%';
            }
            else {
                return null;
            }
        }else{
            return '';
        }
    }


    let abbrArray = showNutritionHelpFunc(activeTab);
    const nutritionsTotals = abbrArray.map((abbr, index) => {
        let result = 0;

        if (abbr === 'Ener' || abbr === 'Prot' || abbr === 'Fett' || abbr === 'Fibe' || abbr === 'Kolh'){
            result = standardCalc(getNutritionsTotalsForOneAbbr(abbr, calculatedNutritionResult), abbr);
        }
        else {
            result = allOtherCalc(getNutritionsTotalsForOneAbbr(abbr, calculatedNutritionResult), abbr);
        }
        return <div className="total-nutrition" key={index}>{result}</div>;
    })

    return (
        <div className="table-total-row">
            <div className="total-receipt"></div>
            <div className="total-nutrition-container">{nutritionsTotals}</div>
        </div>
    );
}


export const foodListNutritions = gql`query allNutrients {
    allNutrients{
    name
    abbreviation
    typeOfNutrient
    unitforRI
    unit
    woman1830
    woman3160
    woman6174
    womangreater75
    man1830
    man3160
    man6174
    mangreater75
    womanPregnant
    womanBreastfeeding
    }
}`

export default graphql(foodListNutritions)(TableTotalRow);


//export default (TableTotalRow);