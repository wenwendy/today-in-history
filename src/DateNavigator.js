import React from 'react';

export function Yesterday(props){
  return(
    <button onClick={props.handler}> Yesterday </button>
  );
}

export function Tomorrow(props){
  return(
    <button onClick={props.handler}> Tomorrow </button>
  );
}

export function Today(props){
  return(
    <button onClick={props.handler}> Today </button>
  );
}
