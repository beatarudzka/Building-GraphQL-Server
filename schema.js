const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  // GraphQLNonNull,
} = require('graphql')

//Hardcoded Data

const articles = [
  {
    id: "1", title: 'title1', tags: '#tag', description: 'description1', photos: 'Illustration_Lotus_corniculatus0.jpg', date: '"2020-01-15T00:00:00.000Z"'
  },
  {
    id: "2", title: 'title2', tags: '#tag2', description: 'description2', photos: 'Illustration_Lotus_corniculatus2.jpg', date: '"2020-02-15T00:00:00.000Z"'
  },
  {
    id: "3", title: 'title3', tags: '#tag3', description: 'description3', photos: 'Illustration_Lotus_corniculatus3.jpg', date: '"2020-03-15T00:00:00.000Z"'
  }

]

// Article Type
const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    tags: { type: GraphQLString },
    description: { type: GraphQLString },
    photos: { type: GraphQLString },
    date: { type: GraphQLInt }
  })
})

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].id == args.id) {
            return articles[i]
          }
        }
      }
    }
  },
  articles: {
    type: new GraphQLList(ArticleType),
    resolve(parentValue, args) {
      return articles
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})





























