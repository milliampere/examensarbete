
export function findDbResult(data, loading, changableInput) {
	let dataFromDb = {}

console.log(data, changableInput);
	if(!data.loading && changableInput){
		dataFromDb = data.find((food) => {
			return food.livsmedelsverketId === changableInput.livsmedelsverketId;
		})
	}
	return dataFromDb || {}; //dataFromDb blir 'undefined' i find om påståendet är falskt
}

