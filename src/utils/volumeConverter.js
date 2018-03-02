export function convertToDl(value, unit) {

    let valueInDl = null;

    if(unit === ('liter' || 'l')){
        valueInDl = value*10;
    } else if (unit === 'deciliter' || unit === 'dl') {
        valueInDl = value;
    } else if (unit === 'centiliter' || unit === 'centiliter') {
        valueInDl = value/10;
    } else if (unit === 'milliliter' || unit === 'ml') {
        valueInDl = value/100;
    } else if (unit === 'matsked' || unit === 'msk') {
        valueInDl = value/100*15;
    } else if (unit === 'tesked' || unit === 'tsk') {
        valueInDl = value/100*5;
    } else if (unit === 'kryddmått' || unit === 'krm') {
        valueInDl = value/100;
    }

    return valueInDl
}

//console.log(convertToDl(1,'msk'));


export function convertToGram(value, unit) {

    let valueInGram;

    if(unit === 'kilogram' || unit === 'kg'){
        valueInGram = value*1000;
    }
    else if (unit === 'hektogram' || unit === 'hg'){
        valueInGram = value*100;
    }
    else if (unit === 'milligram' || unit === 'mg'){
        valueInGram = value/1000;
    }

    return valueInGram
}

console.log(convertToGram(1,'kg'));
