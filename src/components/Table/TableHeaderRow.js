import React from 'react';
import'./TableHeaderRow.css';

const TableHeaderRow = (props) => {

    const { activeTab } = props;

    const inputHeaders = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <div className="header-receipt" key={index}>{item}</div>
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

    const nutritionsHeaders = headersArray.map((abbr, index) => {
        return <div className="header-nutrition" key={index}>{abbr}</div>
    })


    return (
        <div className="table-header-row">
            {inputHeaders}
            {nutritionsHeaders}
        </div>
    );
}

export default TableHeaderRow;