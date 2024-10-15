const API_BASE_URL = 'http://52.195.171.228:8080';

export const fetchBooks = async () => {
  console.log("received")
  const response = await fetch(`${API_BASE_URL}/books/`);
  const data = await response.json(); // Convert the response to JSON
  console.log('Received Response:', data);
  return data;
};

export const fetchBookDetails = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}/`);
  const data = await response.json(); // Convert the response to JSON
  console.log('Received Response:', data);
  return data;
};

export const fetchChapterDetails = async (chapterId) => {
  const response = await fetch(`${API_BASE_URL}/chapters/${chapterId}/`);
  const data = await response.json(); // Convert the response to JSON
  console.log('Received Response:', data);
  return data;
};