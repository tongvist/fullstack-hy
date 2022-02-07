import React from 'react';

const BookTable = ({ books, filter='' }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {books.data.allBooks.map(a =>
          filter === '' || a.genres.includes(filter)
          ? <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          : null
        )}
      </tbody>
    </table>
  );
};

export default BookTable;