import React, { Component } from 'react';
import InventoryList from "./InventoryList";
import './App.css';

// function App() {
//   return (

//     <div className="App">
//       <p>something</p>
//       <header className="App-header">

//       <p>
//         hello Eimert
//       </p>

//       </header>
      
//     </div>
//   );
// }

class App extends Component {
  render() {
    return (
      <div className='App'>
        <InventoryList />
      </div>
    );
  }
}

export default App;
