export default function amountHelpFunc(changableInput, nutrition) {
    let convertedAmount = null;
    if(changableInput.type === 'g') {
        convertedAmount = convertAmount(nutrition.value, changableInput);
    }
    if(changableInput.type !== 'g'){
        if(changableInput.type === 'st'){
            convertedAmount = convertAmount(nutrition.gramPerPiece, changableInput);
        }
        if(changableInput.type === 'dl'){
            convertedAmount = convertAmount(nutrition.gramPerPiece, changableInput);
        }
        else{
            //convert to dl
            //const volumeDl =
            //convertedAmount = convertAmount();
        }
    }
    return convertedAmount;
}

function convertAmount(valueInGram, changableInput) {
    //Diveded by 100 to get value per 1 gram and multiplied with recepie amount
    const amountPerPortion = (valueInGram * changableInput.amount)/100;
    return amountPerPortion;
}