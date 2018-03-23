
export function findDbResult(data, changableInput) {
	let dataFromDb = {}
	if(!data.loading){
		dataFromDb = data.allFoods.find((food) => {
			return food.livsmedelsverketId === changableInput.livsmedelsverketId;
		})
	}
	return dataFromDb || {}; //dataFromDb blir 'undefined' i find om påståendet är falskt
}

