const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')

const {MONGO_URI} = require('./config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ 

  typeDefs, 
  resolvers,
  context: (ctx) => ctx
});

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    err => err ? console.log('Failed to connect to MongoDB') : console.log('MongoDB connected'))

server.listen(4041).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});