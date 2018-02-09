import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import db from '../db.json'
import Post from './Post.js'


class Table extends Component  {

  state = {
    selectedFoodNames: [],
    selectedFood: [],
  }

  render () {

    const { loading, error, Food } = this.props.data;

    return (
      <div>
        {error &&
          <h1>Error fetching Foods!</h1>
        }
        {loading &&
          <h2>Loading Foods...</h2>
        }
        {!loading &&
          <div>
            {Food.nutritions[0].name}
            <Post />
          </div>
        }
      </div>
    )
  }
}



export const foodListNutritions = gql`
query Food {
  Food(livsmedelsverketId: 4) {
    id
    livsmedelsverketId
    name
    nutritions
  }
}
`

export default graphql(foodListNutritions)(Table)