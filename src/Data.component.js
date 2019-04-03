import React from 'react';

export default ({ data }) => {
  return (
    <div>
      <h4>first traded price</h4><p>{data[2]}</p>
      <h4>hightest price</h4><p>{data[3]}</p>
      <h4>lowest price</h4><p>{data[4]}</p>
      <h4>Last traded price</h4><p>{data[5]}</p>
    </div>
  );
}