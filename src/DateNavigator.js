import React from 'react';
import './DateNavigator.css';

export function Yesterday(props){
  const className = props.isPeace ? "peace" : "breach";
  return(
    <button className={className} onClick={props.handler}> {"<"} </button>
  );
}

export function Tomorrow(props){
  const className = props.isPeace ? "peace" : "breach";
  return(
    <button className={className} onClick={props.handler}> {">"} </button>
  );
}

export function Today(props){
  const className = props.isPeace ? "peace" : "breach";
  return(
    <button className={className} onClick={props.handler}> Today </button>
  );
}
