const { GraphQLServer } = require("graphql-yoga");

let links = [{
  id: 'link-0',
  url: 'https://howtographql.com',
  description: "Fullstack Tutorial for GraphQL"
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,

    feed: () => links,
  },

  Mutation: {
    post: (parents, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },


  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://127.0.0.1:4000`))
