import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

function AddBook() {
    const [bookData, setBookData] = useState({
        ISBN: "",
        title: "",
        category:"",
        author: {
          name: "",
          description: "",
        },
        subject: "",
        summary:"",
        publisher: "",
        language: "",
        numberOfPages: null,
        bookImg:"",
        price: null,
        format: "",
        publicationDate:null
      });
    
      const fetchBooks = async () => {
        try {
          const data = await axios("http://localhost:8001/books").then(
            (res) => res.data
          );
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      const addBook = async (postData) => {
        try {
          const {data} = await axios.post("http://localhost:8001/addBook", postData);
          console.log(data)
        } catch (error) {
          console.log("Başarısız")
          console.log(bookData);
      };
        }
        
    
      const onChangeFunc = (e) => {
        if (Object.keys(bookData.author).includes(e.target.name)) {
          setBookData({
            ...bookData,
            author: { ...bookData.author, [e.target.name]: e.target.value },
          });
        } else {
          setBookData({
            ...bookData,
            [e.target.name]: e.target.value,
          });
        }
      };
    
      useEffect(() => {
        fetchBooks();
      }, []);
    
      return (
        <div className="App">
          <form style={{ display: "flex", flexDirection: "column" }}>
            <input
              name="ISBN"
              type="text"
              placeholder="ISBN"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="title"
              type="text"
              placeholder="title"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="category"
              type="text"
              placeholder="category"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="name"
              type="text"
              placeholder="author name"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="description"
              type="text"
              placeholder="author desc"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="subject"
              type="text"
              placeholder="subject"
              onChange={(e) => onChangeFunc(e)}
            />
             <input
              name="summary"
              type="text"
              placeholder="summary"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="publisher"
              type="text"
              placeholder="publisher"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="language"
              type="text"
              placeholder="lang"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="numberOfPages"
              type="number"
              placeholder="numberofpages"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="bookImg"
              type="text"
              placeholder="bookimg"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="price"
              type="number"
              placeholder="price"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="format"
              type="text"
              placeholder="format"
              onChange={(e) => onChangeFunc(e)}
            />
            <input
              name="publicationDate"
              type="number"
              placeholder="publicationDate"
              onChange={(e) => onChangeFunc(e)}
            />
          </form>
          <button onClick={()=>addBook(bookData)}>Add Books</button>
        </div>
      );
}

export default AddBook