import React from 'react';
import { createChangeAction } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    const text = event.target.value;
    dispatch(createChangeAction(text));
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange}></input>
    </div>
  );
};

export default Filter;