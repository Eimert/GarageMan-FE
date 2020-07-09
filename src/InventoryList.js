import React, { Component } from "react";
import axios from "axios";
import jq from "jq-web";

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
      // TODO: add key property to each element
      inventory = jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)');
      // jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)').forEach(element =>
      //   inventory.push(element)
      // );
      // while(inventory.length < jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)').length) {
      //   inventory.push
      // }
      // inventory.push({ id: res.data.id, text: res.data });
      // inventory.push(jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)'));
      console.log(jq.json(res.data, '.[].cars.vehicles[] | select(.licensed == true)'));

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
    return (
      <div className="InventoryList">
        <h1>InventoryList</h1>
        <div className="InventoryList-inventory">
          {this.state.inventory.map(item => (
            // WIP
            <div>{item.make} {item.model}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default InventoryList;