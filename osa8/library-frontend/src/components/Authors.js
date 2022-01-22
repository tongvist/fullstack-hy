import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show }) => {
  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading Authors...</div>
  }
  
  const editYear = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: year } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <form onSubmit={ editYear }>
        <div>
        name
          <input type='text' value={ name } onChange={({ target }) => setName(target.value)}></input>
        </div>
        <div>
        Year of birth
          <input type='number' value={ year } onChange={({ target }) => setYear(parseInt(target.value))}></input>
        </div>
        <button type='submit'>Save</button>
      </form>

    </div>
  )
}

export default Authors