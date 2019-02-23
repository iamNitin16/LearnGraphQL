const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const Link = require('./Model/link');

/*
let links = [{
  id: 'link-0',
  url: 'https://howtographql.com',
  description: "Fullstack Tutorial for GraphQL"
}]
*/

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

let idCount = 10
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews clone`,

    feed: async () => {
      return await Link.find({})
    },

    link: async (parent, args) => {
      return await Link.findById(args.id)
    },
  },

  Mutation: {
    post: async (parents, args) => {
      let l;
      const link = new Link({
        url: args.url,
        description: args.description
      });
      return await link.save()
    },

    updateLink: async (parents, args) => {
      return await Link.findByIdAndUpdate(args.id, {$set: {url: args.url, description: args.description}}, {new: true})
    },

    deleteLink: async (parents, args) => {
      return  await Link.findByIdAndRemove(args.id)
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://127.0.0.1:4000`))
