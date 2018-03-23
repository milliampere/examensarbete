
export function totalEnergyNeed (sex, weightKg, lengthCm, ageYear, PAL) {
    let BMR;    // basal metabolic rate

    // MD Mifflin Man
    if(sex === 'man'){
        BMR = (9.99 * weightKg) + (6.25 * lengthCm) - (4.92 * ageYear) + 5;
    }
    //  MD Mifflin Kvinna
    else if (sex === 'woman'){
        BMR = (9.99 * weightKg) + (6.25 * lengthCm) - (4.92 * ageYear) - 161;
    }
    let totalEnergyNeed = BMR*PAL

    return totalEnergyNeed;
}
