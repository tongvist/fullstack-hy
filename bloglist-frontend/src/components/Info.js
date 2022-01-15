import React from 'react';
import { useSelector } from 'react-redux';

const Info = () => {
  const store = useSelector(state => state.info);
  const classString = `info ${store.infoType}`;

  return (
    <div className={classString}>
      {store.text}
    </div>
  );
};

export default Info;