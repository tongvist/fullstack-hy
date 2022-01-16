import React from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const Info = () => {
  const store = useSelector(state => state.info);

  if (!store.text) {
    return null;
  }

  return (
    <Alert variant={ store.infoType }>
      {store.text}
    </Alert>
  );
};

export default Info;