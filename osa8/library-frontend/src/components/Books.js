import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  const genres = () => {
    let result = []

    for (let book of books.data.allBooks) {
      for (let genre of book.genres) {
        if (!result.includes(genre)) {
          result.push(genre)
        }
      }
    }

    return (
      <div>
        <button onClick={ () => setFilter('') }>All</button>

        {result.map(genre => 
          <button key={ genre } onClick={() => setFilter(genre)}>{ genre }</button>)}
      </div>
    );
  }
  
  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>Loading Books...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <p>Genre:</p>
      { genres() }

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
    </div>
  )
}

export default Books