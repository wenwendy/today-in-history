import React, { Component } from 'react';

class Card extends Component  {

  render() {
    return (
      <div>
        <div class="title">{this.props.title}</div>
        <div class="name">{this.props.name}</div>
        <div class="description">{this.props.description}</div>
      </div>
    );
  }
}

export default Card;
