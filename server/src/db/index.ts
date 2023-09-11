import mongoose from 'mongoose';

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/note-app").then
(() => {
    console.log("DB is connected");
}).catch((err) => {
    console.log("DB connection Failed: ", err);
})