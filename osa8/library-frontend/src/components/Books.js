import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

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

      <BookTable books={ books } filter={ filter }/>

    </div>
  )
}

export default Books