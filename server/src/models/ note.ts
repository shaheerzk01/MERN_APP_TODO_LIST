import { Schema, model } from "mongoose";

export interface newDocument {
    title: string;
    description?: string; // ? bec it is optional not required
};

const noteSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: false,
        trim: true
    }
});

export default model<newDocument>("Note", noteSchema);