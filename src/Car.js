import React, { Component } from "react";
import "./Car.css";

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
        <div>{this.props.make} {this.props.model}</div>
        {/* <div className='Car-make'>{this.props.make}</div>
        <div className='Car-model'>{this.props.model}</div> */}

      </div>
    );
  }
}
export default Car;