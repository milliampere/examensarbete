// import React from 'react'
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
// import db from '../db.json'

// console.log(db.foodInfo[0].name);

// const Post = ({ mutate }) => {

//   return (
//     <button onClick={() => {

//       db.foodInfo.map(food => {
//        mutate({
//           variables: { name: food.name, livsmedelsverketId: food.livsmedelsverketId, nutritions: food.nutritions}
//         })
//           .then(({ data }) => {
//             console.log('got data', data);
//           }).catch((error) => {
//             console.log('there was an error sending the query', error);
//         })
//       })

//     }}>add food item</button>
//   )
// }

// const create = gql`
//  mutation createFood ($name: String, $livsmedelsverketId: Int, $nutritions: Json) {
//    createFood(name: $name, livsmedelsverketId: $livsmedelsverketId, nutritions: $nutritions) {
//      name
//    }
//  }`;

// export default graphql(create)(Post)