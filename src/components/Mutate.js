import React from 'react'
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
//import classificationAndIdList from '../classificationAndIdList.json'

const Mutate = ({ mutate }) => {

  return (
    <button onClick={() => {

/*        classificationAndIdList.map(food => { 

        mutate({
            variables: { id: food.id, group: food.group, euroFirName: food.euroFirName, euroFirCode: food.euroFirCode}
            })
            .then(({ data }) => {
                console.log('got data', data);
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            }) 

        })  */

    }}>Change food items</button>
  )
}

const change = gql`
 mutation updateFood ($id: ID!, $livsmedelsverketId: Int, $group: String, $euroFirCode: String, $euroFirName: String) {
    updateFood(id: $id, livsmedelsverketId: $livsmedelsverketId, group: $group, euroFirCode: $euroFirCode, euroFirName: $euroFirName) {
        name,
        group
   }
 }`;

//export default graphql(change)(Mutate)
//export default Mutate;