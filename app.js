/*******************************
    setup
********************************/
let express = require('express')
let bodyParser = require('body-parser')
let graphqlHttp = require('express-graphql')
let { buildSchema } = require('graphql')

let app = express()

/*******************************
    Middelwares
********************************/
app.use(bodyParser.json())



/************************************************************
 *      Graphql EndPoint
 *      GRAPHQL Doc
    Rq : graphql is a type language

    schema define the routes of query and mutations
    RootQuery : list of possible query {
        return the type like ' events ' : object 
        and each object must have the return type in a []
        to define a list of something you must add the ' ! ' 
    }
    RootMutation: {
        list of query or we can call it function 
        to add , update or delete data 
        createEvent the name of the function
        arguments : name and with type of String 
        and the return of this function is also a String 
    }

    rootValue {
        is a bundle of resulvers
        and each resolver must match the query or mutation name 

    }
*************************************************************/
app.use('/graphql',graphqlHttp({
    schema : buildSchema(`

        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name : String ): String
        }

        schema {
            query:  RootQuery
            mutation : RootMutation
        }
    `),
    rootValue : {
        events : () => {
            return ['vue', 'react','angular']
        },
        createEvent : (args) => {
            const eventName = args.name;
            return eventName
        }
    },
    graphiql : true
}))





/*******************************
    setting up the port
********************************/
app.listen(3000,function(){
    console.log('server running on port : 3000')
})