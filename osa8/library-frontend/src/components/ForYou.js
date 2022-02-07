import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_BOOKS } from '../queries';
import BookTable from './BookTable';

const ForYou = ({ show, user}) => {
  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return <div>Loading books...</div>
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations for you in genre {user.favoriteGenre}</h2>

      <BookTable books={ books } filter={ user.favoriteGenre }/>
      
    </div>
  );
};

export default ForYou;