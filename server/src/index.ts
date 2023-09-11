import express from 'express'
import "./db"
import noteRouter from './routers/note'
import cors from "cors"

// create a server
const app = express();

//this will parse post request coming from fetch.post method. Built in middleware 
app.use(express.json()); 

//cors middleware to make contact with the front end localhost
app.use(cors());

//this will parse post request coming from html form. Built in middleware
app.use(express.urlencoded({ extended: false}));

//by using app.use we can use middleware fucntion for any endpoints


app.use("/note", noteRouter)

//listen to some port
app.listen(8000, () => {
    console.log("listening");
});