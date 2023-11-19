import React from 'react';

const Table = ({ books, handleEdit, handleDelete }) => {
  books.forEach((book, i) => {
    book.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Book Price</th>
            <th>Book Publishing House</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, i) => (
              <tr key={book.id}>
                <td>{i + 1}</td>
                <td>{book.bookTitle}</td>
                <td>{book.bookAuthor}</td>
                <td>{formatter.format(book.bookPrice)}</td>
                <td>{book.bookPublishingHouse}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(book.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No books</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
