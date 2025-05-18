import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },  
    author: { type: String, required: true },  
    genre: { type: String, optional: true },  
    publishedYear: { type: Number, optional: true },
    status:{
        type:String,
        enum: ["unread", "reading", "read"]
    },
    createdAt:Date
})

export const Book = mongoose.model('Book', BookSchema)