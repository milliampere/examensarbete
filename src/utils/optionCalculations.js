const sex = 'woman';
const isPregnant = false;
const isBreastfeeding = false;
const lengthCm = 163;
const weightKg = 53;
const ageYear = 28;
const PAL = 1.4;    // physical activity level

let BMR;    // basal metabolic rate

// MD Mifflin Man
if(sex === 'man'){
    BMR = (9.99 * weightKg) + (6.25 * lengthCm) - (4.92 * ageYear) + 5;
}
//  MD Mifflin Kvinna
else if (sex === 'woman'){
    BMR = (9.99 * weightKg) + (6.25 * lengthCm) - (4.92 * ageYear) - 161;
}

console.log(BMR*PAL);

let totalEnergyNeed = BMR*PAL
 
