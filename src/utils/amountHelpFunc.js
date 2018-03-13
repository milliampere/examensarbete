import precisionRound from './precisionRound';

export default function amountHelpFunc(changableInput, nutrition, conversion) {


    let convertedAmount = null;
    if(changableInput.type === 'g') {
        convertedAmount = convertAmount(nutrition.value, changableInput);
    }

    else if(changableInput.type === 'st'){
        convertedAmount = convertAmount(conversion.gramPerPiece, changableInput);
    }

    else if(changableInput.type === 'port'){
        convertedAmount = convertAmount(conversion.gramPerPort, changableInput);
    }

    else if(changableInput.type === 'hg' || changableInput.type === 'kg' || changableInput.type === 'mg'){
        const convertedGram = convertToGram(nutrition.value, changableInput.type);
        convertedAmount = convertAmount(convertedGram, changableInput);
    }

    else{
        const convertedVolume = convertToDl(nutrition.value, changableInput.type)
        convertedAmount = convertAmount(convertedVolume, changableInput);
    }

    return Number(convertedAmount);
}

function convertAmount(valueInGram, changableInput) {
    //Diveded by 100 to get value per 1 gram and multiplied with recepie amount
    const amountPerPortion = (valueInGram * changableInput.amount)/100;
    return precisionRound((amountPerPortion),2);
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
    } else if (unit === 'dl') {
        valueInDl = value;
    } else if (unit === 'cl') {
        valueInDl = value/10;
    } else if (unit === 'ml') {
        valueInDl = value/100;
    } else if (unit === 'msk') {
        valueInDl = value/100*15;
    } else if (unit === 'tsk') {
        valueInDl = value/100*5;
    } else if (unit === 'krm') {
        valueInDl = value/100;
    }
    return valueInDl
}

