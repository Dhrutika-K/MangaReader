import { Button,ButtonGroup } from '@mui/material';

function ChapterList({ chapters, selectedChapterId, onSelectChapter }) {
  console.log(chapters)
  console.log(selectedChapterId)
  return (
    <ButtonGroup variant="contained" aria-label="chapter selection">
      {chapters.map((chapter) => (
        <Button
          key={chapter.id}
          onClick={() => onSelectChapter(chapter.id)}
          variant={chapter.id === selectedChapterId ? "contained" : "outlined"}
          sx={{
            color: chapter.id === selectedChapterId ? "white" : "black", // Change font color based on selection
            backgroundColor: chapter.id === selectedChapterId ? "darkgreen" : "transparent", // Dark green when selected
            borderColor: "darkgreen", // Ensures border remains green
            '&:hover': {
              backgroundColor: chapter.id === selectedChapterId ? "darkgreen" : "lightgray", // Hover effect
            },
            width:"50px",
            height:"20px"
          }}
        >
          {chapter.chapter}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ChapterList;