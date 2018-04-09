import React from 'react';
const imageStyle = {
  opacity: 0.5,
}

const credit = {
  color: 'grey',
};

export function Peace(props){
  return(
    <div>
      <img style={imageStyle} src={require ("./matthew-kane-278419-unsplash.jpg")} />

      <span style={credit}>
        {'Photo by '}
        <a href="https://unsplash.com/photos/5brvJbR1Pn8?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Matthew Kane</a>
        {' on '} <a href="https://unsplash.com/search/photos/beach?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
      </span>

     </div>
  );
}

export default Peace
