import React from 'react';

const AddNew = ({handleSubmit, handleChange, handleNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleChange}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddNew;
