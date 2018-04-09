import React from 'react';

function BreachClasses(props) {
    return (
        <div className="breach-class-container">{props.item.map(breachClass => (
            <BreachClass item={breachClass} />
            ))}</div>
        
    );
  }

function BreachClass(props){
    return (
        <div>{props.item}</div>
    );

}
  
  export default BreachClasses;