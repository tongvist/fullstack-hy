import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import ForYou from './components/ForYou'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const updateCache = (cache, query, addedBook) => {
  const uniqueByName = (a) => {
    let seen = new Set();

    return a.filter(item => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;

      setNotification(`New book added: "${subscriptionData.data.bookAdded.title}" by ${subscriptionData.data.bookAdded.author.name}`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);

      setTimeout(() => {
        setNotification('');
      }, 5000);
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

      <div>{ notification }</div>

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