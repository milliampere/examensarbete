import React from 'react';
import ReactTable from 'react-table';

const NutritionCalculator = (props) => {

  return (
    <div className="container">
        
      <h1>Näringsinnehåll</h1>

      <ReactTable
          data={props.foods}
          columns={props.columns}
      /> 

    </div>
  );
};

export default NutritionCalculator;