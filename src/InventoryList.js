import React, { Component } from "react";
import Car from "./Car";
import axios from "axios";
import jq from "jq-web";
import "./InventoryList.css";

class InventoryList extends Component {
  static defaultProps = {
  };
  constructor(props) {
    super(props);
    this.state = {
      inventory: JSON.parse(window.localStorage.getItem("inventory") || "[]"),
      loading: false
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // if (this.state.inventory.length === 0) 
    this.getInventory();
  }
  async getInventory() {
    try {
      let inventory = [];
      console.log("performing rest call");
      let res = await axios.get("http://localhost:8080/api/v1/inventory", {
        auth: {
          username: 'admin',
          password: 'admin'
        }
      });
      inventory = jq.json(res.data, '.[].cars.vehicles[]');
      // while(inventory.length < jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)').length) {
      //   inventory.push
      // }
      // inventory.push({ id: res.data.id, text: res.data });
      // inventory.push(jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)'));
      // console.log(jq.json(res.data, '.[].cars.vehicles[]'));

      console.log(inventory);

      this.setState(
        st => ({
          loading: false,
          inventory: [...st.inventory, ...inventory]
        }),
        () =>
          window.localStorage.setItem("inventory", JSON.stringify(this.state.inventory))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='InventoryList-spinner'>
          <h1 className='InventoryList-title'>Loading...</h1>
        </div>
      );
    }
    {/* sort by date_added asc */}
    let inventory = this.state.inventory.sort((a, b) => new Date(a.date_added) - new Date(b.date_added));
    return (
      <div className='InventoryList'>
      <div className='InventoryList-sidebar'>
        <h1 className='InventoryList-title'>
          <span>Garageman</span> Frank
        </h1>
        <img src='https://images.unsplash.com/photo-1562088972-6c6087002996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80' alt="garageman"/>
        {/* <button className='InventoryList-getmore' onClick={this.handleClick}>
          Fetch Inventory
        </button> */}
      </div>

      <div className="InventoryList-inventory">
        
        {inventory.map(c => (
          <Car
            // key={c.id}
            make={c.make}
            model={c.model}
            date_added={c.date_added}
            // upvote={() => this.handleVote(j.id, 1)}
            // downvote={() => this.handleVote(j.id, -1)}
          />
        ))}
      </div>
    </div>
    )
  }
}

export default InventoryList;