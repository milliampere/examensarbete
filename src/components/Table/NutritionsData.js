import React, { Component } from 'react';
import nutritionForOneFood from '../../data/nutritionForOneFood.json';
import showNutritionHelpFunc from '../../utils/showNutritionHelpFunc.js';
import amountHelpFunc from '../../utils/amountHelpFunc.js';
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import './NutritionsData.css'
import { connect } from 'react-redux';

class NutritionsData extends Component {

    componentDidMount(){
        const { save } = this.props;

        const nutritionsResult = this.calculateNutritionResult(this.props, this.props.activeTab);
        //console.log('component did mount', nutritionsResult);

        save(nutritionsResult, this.props.activeTab);
    }

    componentWillReceiveProps(nextProps){
        const { save } = this.props;

        // När byter tab
        //if(nextProps.activeTab !== this.props.activeTab) {
            if((nextProps.values[nextProps.activeTab].length <= this.props.indexInput)){
                //console.log("Klickat på tab som inte är klickad på");
                const nutritionsResult = this.calculateNutritionResult(this.props, nextProps.activeTab);
                //console.log('reviccice props', nutritionsResult);
                save(nutritionsResult, nextProps.activeTab);
            }   
        //}

        // När ändrar input
        if(nextProps.changableInput !== this.props.changableInput) {
            this.calculateNutritionResult(this.props);
        }
    }

    calculateNutritionResult = (props, activeTab) => {
        const { changableInput} = props;
        const nutritionsAbbrArray = showNutritionHelpFunc(activeTab);
        const nutritionsResult = nutritionsAbbrArray.map((abbr, index) => {
            const nutrition = nutritionForOneFood.data.Food.nutritions.find((nutrient) => {
                return nutrient.abbreviation == abbr;
            });
            
            let convertedAmount = null;
            if(nutrition){
                convertedAmount = amountHelpFunc(changableInput, nutrition);
            }
            
            return {
                abbr: abbr,
                value: convertedAmount
            }
            
        })
        
        return nutritionsResult;
    }


    render() {

        const { changableInput, activeTab, values, indexInput} = this.props;

        let nutritionsDivs;

        if(values[activeTab].length){
            let rowValues = values[activeTab][indexInput]
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

/* 
NutritionsData = (props) => {
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
            //console.log(nutrition)
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
 } */


// export const foodListNutritions = gql`
// query Food {
//   Food(livsmedelsverketId: 4) {
//     id
//     livsmedelsverketId
//     name
//     nutritions
//   }
// }



//export default NutritionsData;

const mapStateToProps = (state, ownProps) => {
    return {
      values: state.totalNutrients
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        save: (row, tab) => {dispatch(
            {
                type: "SAVE_ROW",
                value: row, 
                tab: tab 
            }
        )}
    }
}; 
    
    
export default connect(mapStateToProps, mapDispatchToProps)(NutritionsData);