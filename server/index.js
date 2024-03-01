const express = require("express");
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
const jsonGraphqlExpress = require('json-graphql-server')
const graphql = require('./graphql')
const app = express();
const WSServer = require('express-ws')
const WSController = require('./WS/controller')


const PORT = process.env.PORT || 3001;

WSController(app)
app.use(express.json())
app.use(bodyParser.raw({type: 'application/octet-stream'}))
app.use(cors())
app.use('/kanban/api', router)
app.use('/kanban/api/graphql', jsonGraphqlExpress.default(graphql));


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});
