import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Car.css";
import Moment from "moment";

class Car extends Component {

  render() {
    return (
      <div className='Car'>
        <div className='Car-text'>
          <Link to={`/car/${this.props.id}`}>
            {this.props.make} {this.props.model} {Moment(this.props.date_added).format('DD-MM-yyyy')}
          </Link>
        </div>
      </div>
    );
  }
}
export default Car;


