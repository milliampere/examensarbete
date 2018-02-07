import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import db from '../db.json'


const Post = ({ mutate }) => {

  return (
    <button onClick={() => {
      mutate({
        variables: { name: db.foodInfo[0].name, livsmedelsverketId: db.foodInfo[0].livsmedelsverketId}
      })
        .then(({ data }) => {
          console.log('got data', data);
        }).catch((error) => {
          console.log('there was an error sending the query', error);
      })
    }}>add food item</button>
  )
}

const create = gql`
 mutation createFood ($name: String, $livsmedelsverketId: Int ) {
   createFood(name: $name, livsmedelsverketId: $livsmedelsverketId) {
     name
   }
 }`;

export default graphql(create)(Post)