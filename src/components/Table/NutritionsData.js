import React, { Component } from 'react';
import nutritionForOneFood from '../../data/nutritionForOneFood.json';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
import amountHelpFunc from '../../utils/amountHelpFunc.js';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import './NutritionsData.css'
import { connect } from 'react-redux';

class NutritionsData extends Component {

    render() {
        const { changableInput, activeTab, values, indexInput, calculatedNutritionResult} = this.props;
        let nutritionsDivs;

        if(calculatedNutritionResult.length){
            let rowValues = calculatedNutritionResult;
            nutritionsDivs = rowValues.map((nutrition, index) => {
                // to only return values and not null or NaN
                if((nutrition.value >= 0) ){
                    return <div className="nutrition-data" key={index}>{nutrition.value}</div>
                }
                else {
                    return <div className="nutrition-data" key={index}></div>
                }
            })
        }

        return (
            <div className="nutrition-container">
                {nutritionsDivs}
            </div>
        );
    }
}


// export const foodListNutritions = gql`
// query Food {
//   Food(livsmedelsverketId: 4) {
//     id
//     livsmedelsverketId
//     name
//     nutritions
//   }
// }

export default (NutritionsData);