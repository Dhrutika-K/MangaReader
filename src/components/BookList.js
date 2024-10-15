import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

function BookList({ books, selectedBookId, onSelectBook }) {
  console.log(books)
  return (
    <ButtonGroup variant="contained" aria-label="book selection">
      {books.map((book) => (
        <Button
          key={book.id}
          onClick={() => onSelectBook(book.id)}
          variant={book.id === selectedBookId ? "contained" : "outlined"}
          sx={{
            color: book.id === selectedBookId ? "white" : "black", // Change font color based on selection
            backgroundColor: book.id === selectedBookId ? "darkgreen" : "transparent", // Dark green when selected
            borderColor: "darkgreen", // Ensures border remains green
            '&:hover': {
              backgroundColor: book.id === selectedBookId ? "darkgreen" : "lightgray", // Hover effect
            },
            width:"200px",
            height:"20px"
          }}
        >
          {book.title}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default BookList;