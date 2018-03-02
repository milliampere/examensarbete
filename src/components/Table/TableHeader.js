import React from 'react';

const TableHeader = (props) => {

    const { activeTab } = props;

    const inputHeaders = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <th key={index}>{item}</th>
    })

    let headersArray = [];

    const minerals = ['P', 'I', 'Fe', 'Ca', 'K', 'Cu', 'Mg', 'Se', 'Zn'];
    const vitamins = ['VitA', 'VitC', ' VitD', 'VitE', 'VitB6', 'VitB12', 'Folat', 'Niek', 'Ribo', 'Tiam'];
    const standard = ['Ener', 'Kolh', 'Fett', 'Prot' , 'Fibe', 'Fullk/tot'];
    const fatt = ['Mfet', 'Mone', 'Pole', 'Kole'];

    if(activeTab === 'standard') {
        headersArray = standard;
    }
    if(activeTab === 'minerals') {
        headersArray = minerals;
    }
    if(activeTab === 'fatt') {
        headersArray = fatt;
    }
    if(activeTab === 'vitamins') {
        headersArray = vitamins;
    }


    const nutritionsHeaders = headersArray.map((abbr) => {
        return <div className="headers" style={{display: 'inline'}}>{abbr}</div>
    })


    return (
        <tr>
            {inputHeaders}
            <th>
                {nutritionsHeaders}
            </th>
        </tr>

    );
}

export default TableHeader;