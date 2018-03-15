import React, { Component } from 'react';



function Card(props) {
  return (
    <div>
      <div>{props.item.Title}</div>
      <div>{props.item.BreachDate}</div>
      <div>{props.item.Domain}</div>
      <div>{props.item.Description}</div>
      <hr />
    </div>
  );
}

export default Card;
