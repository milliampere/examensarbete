let inputString = "3 msk vaniljsocker".trim();

const re1 = /(\d+)\s*(msk|tsk|g)\s*(\w+)/;
const re2 = /\d+\s+\w+/;
const re3 = /^\w+/;

let ingredient = [];

if(inputString.match(re1)){
    //dela upp i siffra, mått, ingrediens 
    ingredient = inputString.split(/(msk|tsk|g)/);

} else if (inputString.match(re2)) {
    //dela upp i siffra och ingrediens
    index = inputString.search(/\d\s+\w/);
    ingredient.push(inputString.substring(0,index+1));
    ingredient.push(inputString.slice(index+2));

} else if (inputString.match(re3)) {
    //dela inte upp, sök direkt på ingrediens
    ingredient.push(inputString); 
}

// ta bort whitespace
ingredient = ingredient.map(i => i.trim());

console.log(ingredient);

