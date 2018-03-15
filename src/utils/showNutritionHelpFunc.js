
export default function showNutritionHelpFunc(activeTab) {
    let nutritionsArray = [];

    const minerals = ['P', 'Fe', 'Ca', 'K', 'Mg', 'Se', 'Zn'];
    const vitamins = ['VitA', 'VitC', 'VitD', 'VitE', 'VitB6', 'VitB12', 'Folat', 'Niek', 'Ribo', 'Tiam'];
    const standard = ['Ener', 'Kolh', 'Fett', 'Prot' , 'Fibe', 'NaCl'];   // 'Fullk/tot', 'Mono/disack'
    const fatt = ['Mfet', 'Mone', 'Pole', 'Kole'];

    if(activeTab === 'standard') {
        nutritionsArray = standard;
    }
    if(activeTab === 'mineral') {
        nutritionsArray = minerals;
    }
    if(activeTab === 'fat') {
        nutritionsArray = fatt;
    }
    if(activeTab === 'vitamin') {
        nutritionsArray = vitamins;
    }
    return nutritionsArray;
}