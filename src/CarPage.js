import React, { Component } from "react";
import axios from "axios";
import "./CarPage.css";
import { Link } from "react-router-dom";
import Moment from "moment";

class CarPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      car: JSON.parse(window.localStorage.getItem("car") || "[]"),
      loading: false
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.getCar(params.id);
  }

  async getCar(id) {
    try {
      console.log("performing rest call");
      let res = await axios.get(`http://localhost:8080/api/v1/inventory/getById/${id}`, {
        auth: {
          // todo: store in a vault
          username: 'admin',
          password: 'admin'
        }
      });
      console.log(res.data);
      this.setState(res.data);
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className='InventoryList'>
        <div className='InventoryList-sidebar'>
          <h1 className='InventoryList-title'>
            <span>Garageman</span> Frank
          </h1>
          <img src='https://images.unsplash.com/photo-1562088972-6c6087002996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80' alt="garage" />
          {/* TODO: shopping cart here */}
        </div>

        <div className="InventoryList-inventory">
          <div className="Car-title">{this.state.car.make} {this.state.car.model} - {this.state.car.year_model}</div>
          <div className="Car-subtitle"><strong>Warehouse:</strong> {this.state.warehouseName} - {this.state.stockLocation}</div>
          <div className="Car-subtitle"><strong>Licensed:</strong> {JSON.stringify(this.state.car.licensed)}</div>
          <div className="Car-subtitle"><strong>Date added:</strong> {Moment(this.state.car.date_added).format('DD-MM-yyyy')}</div>
          <div className="Car-subtitle"><strong>Price:</strong> €{this.state.car.price}</div>

          {/* <ConditionalLink to="" condition={this.state.car.licensed}>Purchase</ConditionalLink> <br></br> */}
          <Link to="">Purchase</Link> <br></br>
          <Link to="/">Go back</Link>
        </div>

      </div>


    );
  }
}
export default CarPage;