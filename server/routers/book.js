import express from 'express';
import { createBook, deleteBook, getBook, getBooks } from '../controller/book.js';

export const bookRouter = express.Router();

bookRouter.get('/books',getBooks);
bookRouter.post('/addBook',createBook);
bookRouter.get('/getBook',getBook);
bookRouter.delete('/deleteBook/:id',deleteBook);