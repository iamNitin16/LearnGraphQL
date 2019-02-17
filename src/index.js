const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

let links = [{
  id: 'link-0',
  url: 'https://howtographql.com',
  description: "Fullstack Tutorial for GraphQL"
}]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,

    feed: () => links,
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.description,
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://127.0.0.1:4000`))
