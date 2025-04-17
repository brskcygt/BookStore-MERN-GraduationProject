import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [bookData, setBookData] = useState({
    ISBN: '',
    title: '',
    category: '',
    author: {
      name: '',
      description: ''
    },
    subject: '',
    summary: '',
    publisher: '',
    language: '',
    numberOfPages: null,
    bookImg: '',
    price: null,
    format: '',
    publicationDate: null
  });

  const fetchBooks = async () => {
    try {
      const data = await axios('http://localhost:8001/books').then(
        (res) => res.data
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook2 = async (postData) => {
    try {
      const { data } = await axios.post('http://localhost:8001/addBook', postData);
      console.log(data);
    } catch (error) {
      console.log('Başarısız');
      console.log(bookData);
    }
  };

  const onChangeFunc = (e) => {
    if (Object.keys(bookData.author).includes(e.target.name)) {
      setBookData({
        ...bookData,
        author: { ...bookData.author, [e.target.name]: e.target.value }
      });
    } else {
      setBookData({
        ...bookData,
        [e.target.name]: e.target.value
      });
    }
  };

  async function fetchBooksFromGoogleBooks(searchTerms, maxResults = 3000) {
    const books = [];
    const batchSize = 40; // API başına maksimum sonuç sayısı

    try {
      // Her terim için arama yapın
      for (const term of searchTerms) {
        for (let i = 0; i < 280; i += 40) {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&startIndex=${i}&maxResults=${batchSize}`
          );

          const data = await response.json();

          if (!data.items || data.items.length === 0) break;

          // Kitapları istediğimiz formata dönüştürme
          for (const item of data.items) {
            if (books.length >= maxResults) break;

            const volumeInfo = item.volumeInfo || {};
            const imageLinks = volumeInfo.imageLinks || {};
            const saleInfo = item.saleInfo || {};

            // ISBN alma
            let isbn = '';
            if (volumeInfo.industryIdentifiers) {
              const isbnObj = volumeInfo.industryIdentifiers.find((id) =>
                id.type === 'ISBN_13' || id.type === 'ISBN_10');
              if (isbnObj) isbn = isbnObj.identifier;
            }

            // Formato dönüştür
            const book = {
              ISBN: isbn || `GB${item.id}`,
              title: volumeInfo.title || 'Unknown Title',
              category: volumeInfo.categories ? volumeInfo.categories[0] : 'Uncategorized',
              author: {
                name: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown Author',
                description: `Author of ${volumeInfo.title || 'Unknown Title'}`
              },
              subject: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'General',
              summary: volumeInfo.description || `A book titled ${volumeInfo.title}`,
              publisher: volumeInfo.publisher || 'Unknown Publisher',
              language: volumeInfo.language || 'en',
              numberOfPages: volumeInfo.pageCount || 0,
              bookImg: imageLinks.thumbnail || '',
              price: saleInfo.listPrice ? saleInfo.listPrice.amount : 9.99,
              format: volumeInfo.printType || 'Paperback',
              publicationDate: new Date(volumeInfo.publishedDate).getTime() || null
            };
            if (!volumeInfo.authors || !volumeInfo.title || !volumeInfo.description || !volumeInfo.categories || !volumeInfo.publisher) {
              console.log('boş');
            } else {
              books.push(book);
              if (books.length >= 3000) {
                return books;
              }
            }
          }

          // API hız sınırlarına uymak için bekleyin
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        if (books.length >= maxResults) break;
      }

      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      return books;
    }
  }

  // Örnek kullanım
  async function createBookDatabase() {
    // Çeşitli kategorilerde kitaplar için arama terimleri
    const searchTerms = [
      // Orijinal Terimler
      'classic literature',
      'fantasy fiction',
      'science fiction',
      'mystery',
      'thriller',
      'romance novel',
      'historical fiction',
      'biography',
      'self-help',
      'business',
      'philosophy',
      'psychology',
      'poetry',
      'drama',
      'children books',
      'young adult',

      // Edebiyat Alt Dalları
      'contemporary fiction',
      'short stories',
      'magical realism',
      'gothic fiction',
      'postmodern literature',

      // Bilim Kurgu Alt Dalları
      'cyberpunk',
      'space opera',
      'dystopian',
      'steampunk',
      'time travel',

      // Kurgu Çeşitleri
      'legal thriller',
      'medical thriller',
      'psychological thriller',
      'cozy mystery',
      'crime fiction',
      'detective fiction',
      'supernatural fiction',
      'horror fiction',
      'paranormal romance',

      // Kurgu Olmayan (Non-Fiction) Çeşitleri
      'memoir',
      'autobiography',
      'true crime',
      'essays',
      'journalism',
      'political science',
      'anthropology',
      'sociology',
      'economics',
      'physics',
      'mathematics',
      'biology',
      'environmental science',
      'technology',
      'computer science',

      // Popüler Kategoriler
      'bestseller',
      'award winning',
      'classic novels',
      'world literature',
      'graphic novel',
      'manga',
      'cookbook',
      'travel guide',
      'art history',
      'music history',
      'spirituality',
      'religious studies'
    ];

    const books = await fetchBooksFromGoogleBooks(searchTerms, 3000);

    // Dosyaya kaydetme için
    console.log(`Toplam ${books.length} kitap bulundu.`);
    console.log(JSON.stringify(books, null, 2));

    // Veritabanına ekleme için
    for (const book of books) {
      try {
        await addBook(book);
        console.log(`"${book.title}" veritabanına eklendi.`);
      } catch (error) {
        console.error(`"${book.title}" eklenirken hata:`, error);
      }
    }
  }

  // Bir kitabı veritabanına ekleyen fonksiyon
  async function addBook(postData) {
    try {
      const response = await fetch('http://localhost:8001/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Kitap ekleme başarısız:', error);
      throw error;
    }
  }

  // Axios ile kitap ekleme fonksiyonu (sizin orijinal kodunuz)
  async function addBookWithAxios(postData) {
    try {
      const { data } = await axios.post(
        'http://localhost:8001/addBook',
        postData
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log('Başarısız');
      throw error;
    }
  }

  useEffect(() => {
    fetchBooks();
    createBookDatabase();
  }, []);

  return (
    <div className="App">
      <form style={{ display: 'flex', flexDirection: 'column' }}>
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
      <button onClick={() => addBook(bookData)}>Add Books</button>
    </div>
  );
}

export default AddBook;
