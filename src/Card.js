import React from 'react';

function Card(props) {
  return (
    <div>
      <div>{props.item.Title}</div>
      <div>{props.item.BreachDate}</div>
      <div>{props.item.Domain}</div>
      <div dangerouslySetInnerHTML={{__html: props.item.Description}} />
      <hr />
    </div>
  );
}

export default Card;
