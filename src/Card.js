import React, { Component } from 'react';


function Card(props) {
  return (
    <div>
      <div class="title">{props.title}</div>
      <div class="name">{props.name}</div>
      <div class="description">{props.description}</div>
    </div>
  );
}

export default Card;
