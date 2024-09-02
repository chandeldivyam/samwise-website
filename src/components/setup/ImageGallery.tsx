import React, { useState, useEffect } from 'react';
import { Box, IconButton, Modal, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: { src: string; alt: string; caption?: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: 400,
        mb: 2,
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            layout="fill"
            objectFit="contain"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}

      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'absolute',
          right: 10,
          bottom: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ZoomInIcon />
      </IconButton>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: 1,
        }}
      >
        <Typography variant="caption">
          {images[currentIndex].caption || `Image ${currentIndex + 1} of ${images.length}`}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageGallery;