function useRegex(inputString = '') {

    inputString = inputString.trim();

    const re1 = /(\d+)\s+(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s(\D+)/;
    const re2 = /\d+\s+\D/;
    const re3 = /^\D+/;   // \D is "not digit"

    let ingredientArray = [];
    let ingredientObject = {
        amount: 0,
        type: '',
        name: ''
    };

    if(inputString.match(re1)){
        //separate amount, type and name 
        ingredientArray = inputString.split(/\s(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s/);
        ingredientObject.amount = ingredientArray[0];
        ingredientObject.type = ingredientArray[1];
        ingredientObject.name = ingredientArray[2];

    } else if (inputString.match(re2)) {
        //separate amount and name 
        index = inputString.search(/\d\s+\D/);
        ingredientObject.amount = inputString.substring(0,index+1);
        ingredientObject.name = inputString.slice(index+2);

    } else if (inputString.match(re3)) {
        // don't separate
        ingredientObject.name = inputString; 
    }

    for (let property in ingredientObject){
        if(typeof ingredientObject[property] === 'string'){
            // remove whitespace
            ingredientObject[property] = ingredientObject[property].trim();

            // change amount to number
            if(property === 'amount'){
                if(ingredientObject[property].match(/\d+/)){
                    ingredientObject[property] = ingredientObject[property].replace(',','.');
                    ingredientObject[property] = Number(ingredientObject[property])   
                }  
            }

        } else if(typeof ingredientObject[property] === 'undefined') {
            // reset if undefined
            ingredientObject[property] = '';
        }
    }  

    return ingredientObject;

}

console.log(useRegex("1,5 msk vaniljpulver"));