import React from 'react';
import { createChangeAction } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = (props) => {
  
  const handleChange = (event) => {
    const text = event.target.value;
    props.createChangeAction(text);
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

const mapDispatchToProps = {
  createChangeAction
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);

export default ConnectedFilter;