import express from "express"
import Connection from "./connection"
const cors = require("cors")
const PORT = 4000



const App = express()
App.use(cors)
const corsOptions = {
    origin: 'http://example.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie with CORS
    optionsSuccessStatus: 204,
};
App.use(cors(corsOptions))
