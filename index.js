const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {})
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: 3001 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })