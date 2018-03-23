import precisionRound from './precisionRound';
import { convertToDl } from './converter';


export function valuePerAmount(valuePer100g, amount) { // old convertAmount
    //Diveded by 100 to get value per 1 gram and multiplied with recipe amount
    const value = (valuePer100g * amount)/100;
    return precisionRound((value), 2);
}

/**
 * Check if the unit has matching key in conversion object
 * @param {string} unit  // t ex 'st'
 * @param {object} conversion  // t ex {gramPerPiece}
 */
export function hasConversion(unit, conversion){

    if(conversion === null) {
        return false;
    }

    switch(unit){
        case 'st' :
            return (conversion.hasOwnProperty('gramPerPiece') ? true : false);
            break;
        case 'dl' :
        case 'l' :
        case 'cl' :
        case 'ml' :
        case 'msk' :
        case 'tsk' :
        case 'krm' :
            return (conversion.hasOwnProperty('gramPerDl') ? true : false);
            break;
        case 'port' :
            return (conversion.hasOwnProperty('gramPerPortion') ? true : false);
            break;
        default:
            return false;
    }
}

/**
 * Use conversion object, returns value in gram
 * @param {string} amount  // '5'
 * @param {string} unit  // 'st'
 * @param {object} conversion  // {gramPerPiece: 20}
 */
export function useConversion(amount, unit, conversion) {
    amount = Number(amount);
    switch(unit){
        case 'st' :
            return conversion.gramPerPiece * amount;
            break;
        case 'dl' :
        case 'l' :
        case 'cl' :
        case 'ml' :
        case 'msk' :
        case 'tsk' :
        case 'krm' :
            return conversion.gramPerDl * convertToDl(amount,unit);;
            break;
        case 'port' :
            return conversion.gramPerPort * amount;
            break;
        default:
            return null;
    }
}

export function isValidAmount(amount) {
    return ((Number(amount) > 0) ? true : false);
}

export function isValidUnit(unit) {
    const regex = /^(kg|g|hg|mg|l|dl|cl|ml|msk|tsk|krm|st|port)$/;
    return regex.test(unit) ? true : false;
}

export function isMass(unit){
    const regex = /^(kg|g|hg|mg)$/;
    return (regex.test(unit) ? true : false);
};

