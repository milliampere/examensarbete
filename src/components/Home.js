import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import db from '../db.json'
import Post from './Post.js'


const Home = ({ data: { loading, error, allFoods, _allFoodsMeta } }) => {
  if (error) return <h1>Error fetching Foods!</h1>
  if (!loading) {
    return (
      <div>
        <div>{allFoods[0].name}</div>
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

export default graphql(allFoods)(Home)