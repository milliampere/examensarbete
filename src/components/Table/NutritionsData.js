import React from 'react';
import nutritionForOneFood from '../../data/nutritionForOneFood.json';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

import './NutritionsData.css'


const NutritionsData = (props) => {

    const { changableInput } = props;

    const minerals = ['P', 'I', 'Fe', 'Ca', 'K', 'Cu', 'Mg', 'Se', 'Zn'];
    const vitamins = ['VitA', 'VitC', ' VitD', 'VitE', 'VitB6', 'VitB12', 'Folat', 'Niek', 'Ribo', 'Tiam'];
    const standard = ['Ener', 'Kolh', 'Fett', 'Prot' , 'Fibe', 'Fullk/tot'];
    const fatt = ['Mfet', 'Mone', 'Pole', 'Kole'];


    //instead of mineras.map use map for the prop that comes from nutritions buttonClick
    const nutritionsResult = minerals.map((abbr) => {
        const nutrition = nutritionForOneFood.data.Food.nutritions.find((nutrient) => { return nutrient.abbreviation === abbr});
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
            return <div className="table-data" style={{display: 'inline'}}>{convertedAmount} {nutrition.unit}</div>
        }
        return <div className="table-data" style={{display: 'inline'}}></div>
    })



    function convertAmount(valueInGram) {
        //Diveded by 100 to get value per 1 gram and multiplied with recepie amount
        const amountPerPortion = (valueInGram * changableInput.amount)/100;
        return amountPerPortion;
    }


    return (
        <div>
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

