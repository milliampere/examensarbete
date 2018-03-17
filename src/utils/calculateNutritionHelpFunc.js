//import amountHelpFunc from './amountHelpFunc.js';
//import showNutritionHelpFunc from './showNutritionHelpFunc.js';
//import nutritionForOneFood from '../data/nutritionForOneFood.json';

export function findDbResult(data, changableInput) {
	let dataFromDb = {}
	if(!data.loading){
		dataFromDb = data.allFoods.find((food) => {
			return food.livsmedelsverketId === changableInput.livsmedelsverketId;
		})
	}
	return dataFromDb || {}; //dataFromDb blir 'undefined' i find om påståendet är falskt
}

/*   flyttat till Table-komponenten
export function  calculateNutritionResultForAllRows(changableInputArray, activeTab, data) {
	return changableInputArray.map((row) => {
		const dataFromDb = findDbResult(data,row);
		return calculateNutritionResult(row, activeTab, dataFromDb).array;
	})
}
*/

/*   flyttat till Table-komponenten
export function calculateNutritionResult(changableInput, activeTab, dataFromDb) {

	let nutritionsResult = {
		array: [],
		error: true,
		errorMessage: ''
	};

	const nutritionsAbbrArray = showNutritionHelpFunc(activeTab);
	const conversion = dataFromDb.conversion || {}; //conversion är tomt object om det inte finns inlagt i db = för att slippa error på conversion of 'undefined'

	if(changableInput.type === 'st' && !conversion.gramPerPiece) {
		nutritionsResult.errorMessage = 'vi hittar inte vikt/st, skriv in mått i gram istället';
	}
	else if(changableInput.type === 'dl' && !conversion.gramPerDl){
		nutritionsResult.errorMessage = 'vi hittar inte vikt/dl, skriv in mått i gram istället';
	}
	else if(changableInput.type === 'port' && !conversion.gramPerPortion){
		nutritionsResult.errorMessage = 'vi hittar inte vikt/port, skriv in mått i gram istället';
	}
	else {
		nutritionsResult.array = nutritionsAbbrArray.map((abbr) => {
			const nutrition = dataFromDb.nutritions.find((nutrient) => {
				return nutrient.abbreviation === abbr;
			});
			let convertedAmount = null;
			if(nutrition && changableInput.amount >= 0){
				convertedAmount = amountHelpFunc(changableInput, nutrition, conversion);
			}
			return {
				abbr: abbr,
				value: convertedAmount
			}
		})
		nutritionsResult.error = false;
		nutritionsResult.errorMessage = '';
	}
	return nutritionsResult;
}


 */