import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import {fetchChapterDetails } from '../api';

const ChapterDetails = ({ chapter, chapters, onSelectChapter }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    // Reset page index to 0 when the chapter changes
    setCurrentPageIndex(0);
  }, [chapter]);

  const handlePageChange = async (direction) => {
    if (!chapter || !chapter.pages) return;

    const totalPages = chapter.pages.length;

    if (direction === 'next') {
      if (currentPageIndex < totalPages - 1) {
        // Move to the next page within the current chapter
        setCurrentPageIndex(currentPageIndex + 1);
      } else {
        // Move to the next chapter if on the last page
        const currentChapterIndex = chapters.findIndex(c => c.id === chapter.id);
        const nextChapterIndex = currentChapterIndex + 1;
        if (nextChapterIndex < chapters.length) {
          onSelectChapter(chapters[nextChapterIndex].id);
          setCurrentPageIndex(0);
        }
      }
    } else if (direction === 'previous') {
      if (currentPageIndex > 0) {
        // Move to the previous page within the current chapter
        setCurrentPageIndex(currentPageIndex - 1);
      } else {
        // Move to the previous chapter's last page if on the first page
        const currentChapterIndex = chapters.findIndex(c => c.id === chapter.id);
        const prevChapterIndex = currentChapterIndex - 1;
        if (prevChapterIndex >= 0) {
          const prevChapter = chapters[prevChapterIndex];
          onSelectChapter(prevChapter.id);
          const prevChapterDetails = await fetchChapterDetails(prevChapter.id);
          setCurrentPageIndex(prevChapterDetails.pages.length-1);
          // We'll set the page index to the last page in useEffect
        }
      }
    }
  };

  if (!chapter) {
    return <Typography variant="h6">No chapter selected</Typography>;
  }

  const currentPage = chapter.pages && chapter.pages[currentPageIndex];
  const totalPages = chapter.pages ? chapter.pages.length : 0;

  return (
    <Box sx={{align:"centre"}}>
      <Box mt={4}>
        {currentPage ? (
          <Box
            position="relative"
            mb={4}
            onClick={(e) => {
              const boxWidth = e.currentTarget.offsetWidth;
              const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left;
              if (clickPosition < boxWidth / 2) {
                // Click on the left side (next page)
                handlePageChange('previous');
              } else {
                // Click on the right side (previous page)
                handlePageChange('next');
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={currentPage.image.file}
              alt={`Page ${currentPageIndex + 1}`}
              style={{ width: '100%', maxWidth: '600px' }}
            />
            <Typography variant="h6">Page {currentPageIndex + 1}/{totalPages}</Typography>
          </Box>
        ) : (
          <Typography>No pages available for this chapter.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChapterDetails;