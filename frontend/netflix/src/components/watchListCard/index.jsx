import React, {  useState } from 'react';
import { Box, Dialog,  Card } from '@mui/material';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function WatchList({ image, videoUrl, id, title, data , fetchMovie}) {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleCardClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setShowTooltip(true);
  };
  const handleTooltipClose = () => {
    setShowTooltip(false);
  };


  
  return (
    <Box 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px", 
        overflow: "hidden", 
      }}
    >
      <Card
        sx={{
          width: 200,
          height: 200,
          backgroundColor: '#1c1c1c',
          color: 'white',
          borderRadius: '10px',
          cursor: 'pointer',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: "no-repeat",
          position: 'relative',         
          transition: 'transform 0.3s ease',
          "&:hover": {
            transform: 'scale(2)',
            "& .icon-container": {          
              opacity: 1,
            },
          },
        }}
      >
        <Box
          className="icon-container"
          sx={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            opacity: 0,                  
            transition: 'opacity 0.3s ease',
          }}
        >
          <PlayArrowIcon
            sx={{
              color: 'black',
              fontSize: '20px',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '2px',
              marginRight: '8px',
            }}
            onClick={handleCardClick}
          />
          <Box
            onMouseEnter={handleTooltipOpen}
            onMouseLeave={handleTooltipClose}
            sx={{
              position: 'relative',
              display: 'inline-flex',
            }}
          >
             <CheckCircleOutlineIcon
                sx={{
                  color: 'black',
                  fontSize: '20px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: '2px',
                }}
              />
          
            {showTooltip && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '120%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'grey.800',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px', 
                  fontSize: '8px',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
              Remove from watchlistss
              </Box>
            )}
          </Box>
        </Box>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box sx={{ position: 'relative', padding: '0' }}>
          <iframe
            width="100%"
            height="480"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default WatchList;
