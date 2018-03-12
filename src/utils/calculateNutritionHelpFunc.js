import amountHelpFunc from './amountHelpFunc.js';
import showNutritionHelpFunc from './showNutritionHelpFunc.js';
import nutritionForOneFood from '../data/nutritionForOneFood.json';


export function findDbResult(data, changableInput) {
	let dataFromDb = {}
	if(!data.loading){
		dataFromDb = data.allFoods.find((food) => {return food.livsmedelsverketId === changableInput.livsmedelsverketId})
		if(!dataFromDb){
			dataFromDb = {}
		}
	}
	else {
		dataFromDb = {}
	}
	return dataFromDb
}


export function  calculateNutritionResultForAllRows(changableInputArray, activeTab, data) {
	return changableInputArray.map((row) => {
		const dataFromDb = findDbResult(data,row);
		return calculateNutritionResult(row, activeTab, dataFromDb).array;
	})
}


export function calculateNutritionResult(changableInput, activeTab, dataFromDb = {}) {

	let nutritionsResult = {
		array: [],
		error: false,
		errorMess: 'loading'
	};

	//TOG BORT DENNA O DET VERKA FUNKA?? ANNARS FASTNAR ALLT HÄR...
	// // don't to the rest if no data or loading
 	// if(Object.keys(dataFromDb).length === 0){
	// 	 console.log('wtf!!', Object.keys(dataFromDb))
	// 	return nutritionsResult;
	// }

	const nutritionsAbbrArray = showNutritionHelpFunc(activeTab);
	const conversion = nutritionForOneFood[0].conversion;  // byt till data från databasen
	//const conversion = dataFromDb.conversion; // från db

	if(changableInput.type === 'st' && conversion && !conversion.gramPerPiece) {
		nutritionsResult.error = true;
		nutritionsResult.errorMess = 'vi hittar inte vikt/st, skriv in mått i gram istället';
	}
	else if((changableInput.type === 'port' || changableInput.type === 'dl') && conversion && !conversion.gramPerPort && !(conversion.hasOwnProperty('gramPerPort'))){
		nutritionsResult.error = true;
		nutritionsResult.errorMess = 'vi hittar inte vikt/port, skriv in mått i gram istället';
	}
	else {
		nutritionsResult.array = nutritionsAbbrArray.map((abbr, index) => {
			const nutrition = nutritionForOneFood[0].nutritions.find((nutrient) => {  // byt till data från databasen
			//const nutrition = dataFromDb.nutritions.find((nutrient) => {   // <--- från db
				return nutrient.abbreviation === abbr;
			});

			let convertedAmount = null;
			if(nutrition){
				if(changableInput.amount >= 0){
					if(changableInput.type === 'st') {
						if(conversion.gramPerPiece){
							convertedAmount = amountHelpFunc(changableInput, nutrition, conversion);
						}
						else {
							convertedAmount = null;
						}
					}
					else if(changableInput.type === 'port'){
					}
					convertedAmount = amountHelpFunc(changableInput, nutrition, conversion);
				}else {
					convertedAmount = null;
				}
			}
			return {
				abbr: abbr,
				value: convertedAmount
			}
		})
		nutritionsResult.error = false;
		nutritionsResult.errorMess = '';
	}
	return nutritionsResult;
}


