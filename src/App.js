import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import NutritionCalculator from './components/NutritionCalculator';

class App extends Component {

  state = {
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">

        <Menu pointing>
             
          <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
            Hem
          </Menu.Item>
          
          <Menu.Item
            name='nutrition'
            active={activeItem === 'nutrition'}
            onClick={this.handleItemClick}
          >
            Näringsinnehåll
          </Menu.Item>

        </Menu>

        <main>

        {activeItem === 'home' && <div style={{padding: '1rem'}}>Hem</div>}

        {activeItem === 'nutrition' && <NutritionCalculator />}


        </main>
      </div>
    );
  }
}

export default App;
