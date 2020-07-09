import React, { Component } from 'react';
import InventoryList from "./InventoryList";
import CarPage from "./CarPage";
import { Route, Switch } from "react-router-dom";
import './App.css';


class App extends Component {
  render() {

    return (
      <div className='App'>
        {/* <InventoryList /> */}

        <Switch>
          <Route exact path='/' render={() => <InventoryList />} />
          <Route path='/car/:id' component={CarPage} />
        </Switch>
      </div>
    );

  }
}

export default App;
