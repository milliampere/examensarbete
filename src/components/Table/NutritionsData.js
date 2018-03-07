import React, { Component } from 'react';
import './NutritionsData.css'

class NutritionsData extends Component {

    render() {
        const { calculatedNutritionResult} = this.props;
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

export default (NutritionsData);