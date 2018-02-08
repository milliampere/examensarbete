import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import db from '../db.json'
import Post from './Post.js'


const Home = ({ data: { loading, error, Food, } }) => {
  if (error) return <h1>Error fetching Foods!</h1>
  if (!loading) {
    return (
      <div>
        {Food.nutritions[0].name}
        <Post />
      </div>
    )
  }
  return <h2>Loading Foods...</h2>
}

export const allFoods = gql`
  query allFoods {
    allFoods {
      id
      name
    }
  }
`

export const kokosfett = gql`
query Food {
  Food(livsmedelsverketId: 4) {
    id
    livsmedelsverketId
    name
    nutritions
  }
}
`

export default graphql(kokosfett)(Home)