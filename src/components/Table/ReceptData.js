import React from 'react';
import TableHeader from './TableHeader.js';
import TableData from './TableData.js'
import DropDownMenu from '../DropDownMenu/DropDownMenu';

const ReceptData = (props) => {

    const {
        rawInput,
        index,
        changableInput,
        handleChange,
        activeIndex,
        handleFocus,
        handleBlur
    } = props;

    const headers = ['Från receptet', 'Mängd', 'Mått', 'Livsmedel'].map((item, index) => {
        return <TableHeader key={index} data={item}/>
    })

    const data = rawInputArray.map((rawInput, index) => {
        return <TableData
            rawInput={rawInput}
            key={index}
            index={index}
            changableInput={changableInputArray[index]}
            handleChange={handleChange}
            activeIndex={activeIndex}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
        />
    })

    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {data}
                </tr>
            </tbody>
        </table>
    )
}

export default ReceptData;

