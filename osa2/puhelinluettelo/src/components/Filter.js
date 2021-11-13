import React from 'react';

const Filter = ({handleChange, value}) => {
    return (
        <div>
            Filter names: <input onChange={handleChange} value={value} />
        </div>
    );
};

export default Filter;