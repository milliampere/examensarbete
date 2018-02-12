import React, { Component } from 'react';
//import { graphql } from 'react-apollo'
//import gql from 'graphql-tag'
import Navigation from './components/Navigation'
//import Table from './components/Table';
import TextArea from './components/TextArea';
import Credits from './components/Credits';
//import { debug } from 'util';
import allFoods from './nameList.json'

class App extends Component {

  state = {
    selectedType: 'standard',
    selectedFoodNames: []
  }

  render() {

    //const { loading, error, allFoods } = this.props.data;

    return (
      <div className="App">
        <Navigation selectedType={this.state.selectedType} />
        {/* <Table selectedType={this.state.selectedType} selectedFoodNames={this.props.selectedFoodNames}/> */}
        <TextArea selectedFoodNames={this.props.selectedFoodNames} allFoods={allFoods}/>
        <Credits />
      </div>
    );
  }
}


//Get this list of foodnames and id:s when the plugin is activated (called when open)
/* export const allFoods = gql`
  query allFoods {
    allFoods {
      id
      name
    }
  }
` */

//export default graphql(allFoods)(App)
export default App;