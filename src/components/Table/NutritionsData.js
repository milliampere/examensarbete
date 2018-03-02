import React from 'react';
import nutritionForOneFood from '../../data/nutritionForOneFood.json';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

import './NutritionsData.css'


const NutritionsData = (props) => {

    console.log(nutritionForOneFood.data.Food.nutritions)


    // const min = minerals.map((abbr) => {

    //     const nutrition = nutritionForOneFood.data.Food.nutritions.find((nutrient) => { return nutrient.abbreviation === abbr});
    //     if(nutrition) {
    //         return <div className="table-data" style={{display: 'inline'}}>{nutrition.value}</div>
    //     }
    //     return <div className="table-data" style={{display: 'inline'}}></div>
    // })

    // const getNutritionNameAndUnit = (abbr) => {
    //     const nutrition = nutritionForOneFood.data.allNutrients.find((nutrient) => { return nutrient.abbreviation === abbr});
    //     if(nutrition) { return `${nutrition.name} (${nutrition.unitforRI}) ` }
    //     else { return '' }
    // };


    const { changableInput } = props;


    return (
        <div>
        </div>
    )
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

 export default NutritionsData;

