import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { booksData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem('books_data'));
  //   if (data !== null && Object.keys(data).length !== 0) setBooks(data);
  // }, []);

  useEffect(()=>{
    const fetchData=async ()=>{
      const result=await fetch('http://localhost:3000/api/books/all');
      const jsonResult=await result.json();

      setBooks(jsonResult)
    }

    fetchData();
  },[])

  const handleEdit = id => {
    const [book] = books
    .filter(book => book.id === id);

    setSelectedBook(book);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [book] = books.filter(employee => employee.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${book.bookTitle} data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const booksCopy = books.filter(book => book.id !== id);
        // localStorage.setItem('books_data', JSON.stringify(booksCopy));
        deleteFromDatabase(id);
        setBooks(booksCopy);
      }
    });
  };

  const deleteFromDatabase=((id)=>{
    fetch("http://localhost:3000/api/books/"+id,{
      method:"DELETE"
    }).then(()=>{
        window.location.reload();
    }).catch((err)=>{
      console.log(err);
    })
  })

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            books={books}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          books={books}
          setBooks={setBooks}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          books={books}
          selectedBook={selectedBook}
          setBooks={setBooks}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
