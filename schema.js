const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  // GraphQLNonNull,
} = require('graphql')

//Hardcoded Data


// Article Type
const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    tags: { type: GraphQLString },
    description: { type: GraphQLString },
    photos: { type: GraphQLString },
    date: { type: GraphQLString }
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
        /*
        for(let i = 0;i < articles.length;i++){
            if(articles[i].id == args.id){
                return articles[i];
            }
        }
        */
        return axios.get('http://localhost:3000/articles/' + args.id)
          .then(res => res.data);

      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/articles')
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})





























