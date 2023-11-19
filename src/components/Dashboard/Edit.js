import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ books, selectedBook, setBooks, setIsEditing }) => {
  const id = selectedBook.id;

  const [bookTitle, setBookTitle] = useState(selectedBook.bookTitle);
  const [bookAuthor, setBookAuthor] = useState(selectedBook.bookAuthor);
  const [bookPrice, setBookPrice] = useState(selectedBook.bookPrice);
  const [bookPublishingHouse, setBookPublishingHouse] = useState(selectedBook.bookPublishingHouse);

  const handleUpdate = e => {
    e.preventDefault();

    if (!bookTitle || !bookAuthor || !bookPrice || !bookPublishingHouse) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      bookTitle,
      bookAuthor,
      bookPrice,
      bookPublishingHouse
    };

    for (let i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        books.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('books_data', JSON.stringify(books));
    setBooks(books);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${books.bookTitle}  data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Book</h1>
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
          type="number"
          name="bookPrice"
          value={bookPrice}
          onChange={e => setBookPrice(e.target.value)}
        />
        <label htmlFor="bookPublishingHouse">Publishing house ($)</label>
        <input
          id="bookPublishingHouse"
          type="text"
          name="bookPublishingHouse"
          value={bookPublishingHouse}
          onChange={e => setBookPublishingHouse(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
