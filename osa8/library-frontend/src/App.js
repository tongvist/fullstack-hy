import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import ForYou from './components/ForYou'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`Book added: ${subscriptionData.data.bookAdded.title}`);
    }
  })

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token 
            ? null 
            : <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('for-you')}>for you</button>
              </>
        }
        {
          !token
            ? <button onClick={() => setPage('login')}>login</button>
            : <>
                <button onClick={ logout }>logout</button>
              </>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <ForYou
        show={page === 'for-you'}
        user={user}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setUser={setUser}
      />

    </div>
  )
}

export default App