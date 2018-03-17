export function convertToGram(value, unit) {
    value = Number(value);
    switch(unit){
        case 'g' : 
            return value;
            break;
        case 'kg' : 
            return value*1000;
            break;
        case 'hg' : 
            return value*100;
            break;
        case 'mg' : 
            return value/1000;
            break;
        default : 
            return null;
    }
}

export function convertToDl(value, unit) {
    value = Number(value);
    switch(unit){
        case 'dl' : 
            return value;
            break;
        case 'l' : 
            return value*10;
            break;
        case 'cl' : 
            return value/10;
            break;
        case 'ml' : 
            return value/100;
            break;
        case 'msk' : 
            return value/100*15;;
            break;
        case 'tsk' : 
            return value/100*5;
            break;
        case 'krm' : 
            return value/100;
            break;
        default:
            return null;
    }
}
