import precisionRound from './precisionRound';

export default function amountHelpFunc(changableInput, nutrition, conversion) {
    let convertedAmount = null;

    if(changableInput.type === 'g') {
        convertedAmount = convertAmount(nutrition.value, changableInput.amount);
    }
    else if(changableInput.type === 'st'){
        const totalAmount = conversion.gramPerPiece * changableInput.amount;
        convertedAmount = convertAmount(nutrition.value, totalAmount);
    }
    else if(changableInput.type === 'port'){
        const totalAmount = conversion.gramPerPortion * changableInput.amount;
        convertedAmount = convertAmount(nutrition.value, totalAmount);
    }
    else if(changableInput.type === 'dl'){
        const totalAmount = conversion.gramPerDl * changableInput.amount;
        convertedAmount = convertAmount(nutrition.value, totalAmount);
    }
    else if(changableInput.type === 'hg' || changableInput.type === 'kg' || changableInput.type === 'mg'){
        const totalAmount = convertToGram(changableInput.amount, changableInput.type);
        //console.log(changableInput.type, changableInput.amount, 'gram', totalAmount);
        convertedAmount = convertAmount(nutrition.value, totalAmount);
    }
    else{ //volumes other than above
        if (conversion.gramPerDl) {

            //SOMETHING GOES WRONG HERE!
            const inputAmounDl = convertToDl(changableInput.amount, changableInput.type);
            const totalAmount = conversion.gramPerDl * inputAmounDl;
            console.log('gramDl', conversion.gramPerDl, 'inpoutAmount', inputAmounDl, totalAmount, nutrition.value)
            convertedAmount = convertAmount(nutrition.value, totalAmount);
        }else{ //if amount is a volume like 'cl' or 'ml' and there is no conversion from dl to gram, return null
            convertedAmount = null;
        }
    }
    return Number(convertedAmount);
}


function convertAmount(nutritionValue, amount) { //changed name of first arg, because nutritionValue id not always in gram!
    //Diveded by 100 to get value per 1 gram and multiplied with recepie amount
    const amountPerPortion = (nutritionValue * amount)/100;
    return precisionRound((amountPerPortion), 2);
}


function convertToGram(value, unit) {
    let valueInGram;

    if(unit === 'kg'){
        valueInGram = value*1000;
    }
    else if (unit === 'hg'){
        valueInGram = value*100;
    }
    else if (unit === 'mg'){
        valueInGram = value/1000;
    }
    return valueInGram
}


function convertToDl(value, unit) {
    let valueInDl = null;

    if(unit === 'l'){
        valueInDl = value*10;
    }
    else if (unit === 'cl') {
        valueInDl = value/10;
    }
    else if (unit === 'ml') {
        valueInDl = value/100;
    }
    else if (unit === 'msk') {
        valueInDl = value/100*15;
    }
    else if (unit === 'tsk') {
        valueInDl = value/100*5;
    }
    else if (unit === 'krm') {
        valueInDl = value/100;
    }
    return valueInDl
}

