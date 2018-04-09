import React from 'react';
import BreachClasses from './BreachClasses.js'
import './Breach.css';

function Breach(props) {
  const breach = props.item;

  return (
    <div className="breach-container">
      <div className="breach-title">{breach.Title}</div>
      <div className="breach-date">{breach.BreachDate}</div>
      <BreachClasses item={breach.DataClasses} />
      <div className="breach-description" 
           dangerouslySetInnerHTML={{__html: breach.Description}} />
    </div>
  );
}

export default Breach;
