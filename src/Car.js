import React, { Component } from "react";
import "./Car.css";
import Moment from "moment";

class Car extends Component {

  render() {
    return (
      <div className='Car'>
        <div className='Car-buttons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote} />
          {/* <span className='Car-votes' style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span> */}
          <i className='fas fa-arrow-down' onClick={this.props.downvote} />
        </div>
        <div className='Car-text'>{this.props.make} {this.props.model} {Moment(this.props.date_added).format('DD-MM-yyyy')}</div>
        {/* <div className='Car-make'>{this.props.make}</div>
        <div className='Car-model'>{this.props.model}</div> */}

      </div>
    );
  }
}
export default Car;