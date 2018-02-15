let inputString = "3 msk vaniljsocker".trim();

const re1 = /(\d+)\s*(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s*(\w+)/;
const re2 = /\d+\s+\w+/;
const re3 = /^\w+/;

let ingredient = [];

if(inputString.match(re1)){
    //separate amount, unit and ingredient 
    ingredient = inputString.split(/\s(kilo|kg|gram|g|milligram|mg|liter|l|deciliter|dl|centiliter|cl|milliliter|ml|matsked|msk|tesked|tsk|kryddmått|krm|blad|krukor|kruka|koppar|kopp|nypor|nypa|stycken|st|förpackning|förpackningar|förp|klyftor|klyfta)\s/);

} else if (inputString.match(re2)) {
    //separate amount and ingredient 
    index = inputString.search(/\d\s+\w/);
    ingredient.push(inputString.substring(0,index+1));
    ingredient.push(inputString.slice(index+2));

} else if (inputString.match(re3)) {
    // don't separate
    ingredient.push(inputString); 
}

// ta bort whitespace
ingredient = ingredient.map(i => i.trim());

console.log(ingredient);

