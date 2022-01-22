import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ show }) => {
  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const options = () => {
    const options = authors.data.allAuthors.map(a => {
      return {
        value: a.name, label: a.name
      }
    })

    return options;
}

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading Authors...</div>
  }
  
  const editYear = async (event) => {
    event.preventDefault();
    if (!name || !year) {
      return
    }

    const intYear = parseInt(year)

    editAuthor({ variables: { name, setBornTo: intYear } })

    setName('')
    setYear('')
  }

  const handleChange = (event) => {
    setName(event.value)
    event.value = ''
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
          <Select 
            defaultValue={ name }
            onChange={ handleChange }
            options={ options() }
          />
        </div>
        <div>
        Year of birth
          <input type='number' value={ year } onChange={({ target }) => setYear(target.value)}></input>
        </div>
        <button type='submit'>Save</button>
      </form>

    </div>
  )
}

export default Authors