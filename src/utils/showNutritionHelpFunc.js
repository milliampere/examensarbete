
export default function showNutritionHelpFunc(activeTab) {
    let nutritionsArray = [];

    const minerals = ['P', 'I', 'Fe', 'Ca', 'K', 'Cu', 'Mg', 'Se', 'Zn'];
    const vitamins = ['VitA', 'VitC', 'VitD', 'VitE', 'VitB6', 'VitB12', 'Folat', 'Niek', 'Ribo', 'Tiam'];
    const standard = ['Ener', 'Kolh', 'Fett', 'Prot' , 'Fibe', 'Fullk/tot'];
    const fatt = ['Mfet', 'Mone', 'Pole', 'Kole'];

    if(activeTab === 'standard') {
        nutritionsArray = standard;
    }
    if(activeTab === 'mineraler') {
        nutritionsArray = minerals;
    }
    if(activeTab === 'fettsyror') {
        nutritionsArray = fatt;
    }
    if(activeTab === 'vitaminer') {
        nutritionsArray = vitamins;
    }
    return nutritionsArray;
}

