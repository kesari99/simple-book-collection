import express from 'express'
import { createBook, deleteBook, editBookById, getAllbooks, getBookById } from '../controllers/books-controller.js'

const router = express.Router()

router.post('/create', createBook)
router.get('/get-books', getAllbooks)
router.get('/get-each/:bookId', getBookById)
router.put('/updatebook/:bookId', editBookById)
router.delete('/delete/:bookId', deleteBook)


export default router 