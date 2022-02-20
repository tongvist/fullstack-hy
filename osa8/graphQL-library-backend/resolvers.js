const { UserInputError, AuthenticationError } = require('apollo-server');
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length;
    },
    allBooks: async (root, args) => {
      let books;

      if (args.genre) {
        books = await Book.find({ genres: { $in: args.genre } });
        return books;
      }
      books = await Book.find({})
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: { $in: root._id } });
      return books.length;
    }
  },

  Book: {
    author: async (root) => await Author.findById(root.author._id)
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('User not authenticated')
      }
      
      let knownAuthor = await Author.findOne({ name: args.author });

      if (!knownAuthor) {
        knownAuthor = new Author({ name: args.author })
        try {
          await knownAuthor.save()          
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: 'name'
          })
        }
      }

      const book = new Book({ ...args, author: knownAuthor._id })
      try {
        await book.save(); 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: 'title'
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
      
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('User not authenticated')
      }

      let author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers;