const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");

let links = [{
  id: 'link-0',
  url: 'https://howtographql.com',
  description: "Fullstack Tutorial for GraphQL"
}]

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
  MONGO_AUTH_DATABASE
} = process.env;

/*
  Opening connection with mongodb database
*/
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?authSource=${MONGO_AUTH_DATABASE}`;
mongoose.connect(url, { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to mongodb database");
});

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,

    feed: () => links,

    link: (parent, args) => {
      for(let i=0; i<idCount; i++) {
        if(args.id == links[i].id) {
          return links[i];
        }
      }
    },
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

    updateLink: (parents, args) => {
      for(let i=0; i<idCount; i++) {
        if(args.id == links[i].id) {
          links[i].url = args.url
          links[i].description = args.description
          return links[i]
        }
      }
    },

    deleteLink: (parents, args) => {
      let link
      for(let i=0; i<idCount; i++) {
        if(args.id == links[i].id) {
          link = links[i]
          links.splice(i, 1)
          return link
        }
      }
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://127.0.0.1:4000`))
