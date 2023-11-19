import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ books, setBooks, setIsAdding }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [bookPublishingHouse, setBookPublishingHouse] = useState('');



  const handleAdd = e=> {
    e.preventDefault();
    setBookTitle('');
    setBookAuthor('');
    setBookPrice('');
    setBookPublishingHouse('');

    if (!bookTitle || !bookAuthor || !bookPrice || !bookPublishingHouse) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }
  
      addToDatabase();
    // // localStorage.setItem('books_data', JSON.stringify(books));
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${bookTitle}  data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const addToDatabase=async()=>{
    const newBook = {
      bookTitle,
      bookAuthor,
      bookPrice,
      bookPublishingHouse
    };


    const result =await fetch('http://localhost:3000/api/books/save',{
      method:"POST",
      headers:{
         'Content-Type':'application/json' 
      },
      body: JSON.stringify(newBook)
    })
    books.push(newBook);
    const resultInJson= await result.json();
    setBooks(prev=>[...prev,resultInJson]);
  }

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Book</h1>
        <label htmlFor="bookTitle">Book Title</label>
        <input
          id="bookTitle"
          type="text"
          name="bookTitle"
          value={bookTitle}
          onChange={e => setBookTitle(e.target.value)}
        />
        <label htmlFor="bookAuthor">Book Author</label>
        <input
          id="bookAuthor"
          type="text"
          name="bookAuthor"
          value={bookAuthor}
          onChange={e => setBookAuthor(e.target.value)}
        />
        <label htmlFor="bookPrice">Book Price</label>
        <input
          id="bookPrice"
          type="text"
          name="bookPrice"
          value={bookPrice}
          onChange={e => setBookPrice(e.target.value)}
        />
        <label htmlFor="bookPublishingHouse">Publishing house</label>
        <input
          id="bookPublishingHouse"
          type="text"
          name="bookPublishingHouse"
          value={bookPublishingHouse}
          onChange={e => setBookPublishingHouse(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
