import React from 'react';
import nutritionForOneFood from '../../data/nutritionForOneFood.json';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js'
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import './NutritionsData.css'


const NutritionsData = (props) => {
    const { changableInput, activeTab } = props;

    let nutritionsArray = showNutritionHelpFunc(activeTab);

    const nutritionsResult = nutritionsArray.map((abbr, index) => {
        const nutrition = nutritionForOneFood.data.Food.nutritions.find((nutrient) => {
            return nutrient.abbreviation == abbr;
        });
        if(nutrition) {
            let convertedAmount = '';
            if(changableInput.type === 'g') {
                convertedAmount = convertAmount(nutrition.value);
            }
            if(changableInput.type !== 'g'){
                if(changableInput.type === 'st'){
                    convertedAmount = convertAmount(nutrition.gramPerPiece);
                }
                if(changableInput.type === 'dl'){
                    convertedAmount = convertAmount(nutrition.gramPerPiece);
                }
                else{
                    //convert to dl
                    //const volumeDl =
                    //convertedAmount = convertAmount();
                }
            }
            console.log(nutrition)
            return <div className="nutrition-data" key={index}>{convertedAmount}</div>
        }
        else {
            return <div className="nutrition-data" key={index}></div>
        }
    })

    function convertAmount(valueInGram) {
        //Diveded by 100 to get value per 1 gram and multiplied with recepie amount
        const amountPerPortion = (valueInGram * changableInput.amount)/100;
        return amountPerPortion;
    }


    return (
        <div className="nutrition-container">
            {nutritionsResult}
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

