import React from 'react';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
import nutritionFor9Foods from '../../data/nutritionFor9Foods.json';
import { connect } from 'react-redux';

import'./TableTotalRow.css';

const TableTotalRow = (props) => {

    // loopa array med livsmedel
/*     props.changableInputArray.map((changableInput) => {
        console.log(changableInput.livsmedelsverketId);
    });  */
        
    // loopa svar från databas
/*     nutritionFor9Foods.data.allFoods.map((oneFood) => {
        
        const nutrition = oneFood.nutritions.find((nutrient) => {
            return nutrient.abbreviation === "Ener";
        });

        const changableInput = props.changableInputArray.find((c) => {
            return c.livsmedelsverketId === 4457;
        });

        console.log(nutrition);
        console.log(changableInput);

        const nutritionPerAmount = nutrition.value*changableInput.amount;

        console.log(nutritionPerAmount);
    }); */

    const { activeTab, allNutrients } = props;

    const emptyForInputs = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="total-receipt" key={index}></div>
    })

    let totalsArray = showNutritionHelpFunc(activeTab);

    const nutritionsTotals = totalsArray.map((abbr, index) => {
        return <div className="total-nutrition" key={index}>{abbr}</div>
    }) 

    //console.log(nutritionsTotals);

    //props.save('hej');

    return (
        <div className="table-total-row">
            {emptyForInputs}
            {nutritionsTotals}
        </div>
    );
}


const mapStateToProps = (state, ownProps) => {
    return {
      values: state.totalNutrients
    }
}
  

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        save: (row) => {dispatch(
            {
                type: "SAVE_ROW",
                value: row
            }
        )}
    }
}; 

export default connect(mapStateToProps, mapDispatchToProps)(TableTotalRow);