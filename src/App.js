import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BookList from './components/BookList';
import ChapterList from './components/ChapterList';
import ChapterDetails from './components/ChapterDetails';
import { Container, Grid, Box } from '@mui/material';
import { fetchBooks, fetchBookDetails, fetchChapterDetails } from './api';

const theme = createTheme();

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks || []);
      if (fetchedBooks.length > 0) {
        const firstBook = fetchedBooks[0];
        console.log(firstBook);
        await loadBookDetails(firstBook.id);
      }
    };
    loadInitialData();
  }, []);

  const loadBookDetails = async (bookId) => {
    const bookDetails = await fetchBookDetails(bookId);
    setSelectedBook(bookDetails);
    let chapters = [];
    let chapters_ids = bookDetails.chapter_ids;

    for (let i = 0; i < chapters_ids.length; i++) {
      chapters.push({
        id: chapters_ids[i], // Chapter ID
        chapter: i + 1,     // Chapter number (starting from 1)
      });
    }
    console.log(chapters);
    setChapters(chapters || []);
    console.log(bookDetails);
    if (bookDetails.chapter_ids.length > 0) {
      await loadChapterDetails(bookDetails.chapter_ids[0]);
    }
  };

  const loadChapterDetails = async (chapterId) => {
    const chapterDetails = await fetchChapterDetails(chapterId);
    console.log(chapterDetails);
    setSelectedChapter(chapterDetails);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" width="100%">
              <BookList 
                books={books} 
                selectedBookId={selectedBook?.id}
                onSelectBook={loadBookDetails} 
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" width="100%">
              <ChapterList 
                chapters={chapters} 
                selectedChapterId={selectedChapter?.id}
                onSelectChapter={loadChapterDetails} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="center" width="100%">
              <ChapterDetails 
                chapter={selectedChapter}
                chapters={chapters}
                onSelectChapter={loadChapterDetails} 
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;