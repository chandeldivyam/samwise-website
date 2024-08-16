import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, TextField, InputAdornment, Button as MuiButton } from '@mui/material';
import { motion } from 'framer-motion';
import Typography from '../common/Typography';
import Button from '../common/Button';
import IdeaFlowAnimation from './IdeaFlowAnimation';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import DiscordIcon from '../../utils/DiscordIcon';

const phrases = [
  "Speak powerfully.",
  "Grow continuously.",
];

const HeroSection: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  const fetchStarCount = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/chandeldivyam/samwise');
      const data = await response.json();
      setStarCount(data.stargazers_count);
    } catch (error) {
      console.error('Error fetching star count:', error);
    }
  };

  useEffect(() => {
    fetchStarCount();
  }, []);  

  useEffect(() => {
    const animateText = () => {
      const phrase = phrases[currentPhrase];
      const fullText = phrase;
      const speed = isDeleting ? 50 : 100;

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      } else {
        setText(prev => 
          isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1)
        );
      }
    };

    const timer = setTimeout(animateText, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#FFF',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <IdeaFlowAnimation />
      </Box>
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }} style={{ marginTop: '3rem' }}>
        <Grid container spacing={4} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8 }}
            >
              <Typography variant="h1" gutterBottom sx={{ color: '#000', fontSize: { xs: '2.5rem', md: '3.5rem' }, height: { xs: '9rem', md: '6rem' }, overflow: 'hidden' }}>
                Think clearly.{' '}
                <span style={{ color: '#1976d2' }}>
                  {text}
                  <span style={{ opacity: 0.7 }}>|</span>
                </span>
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.2 }}
            >
              <Typography variant="h2" gutterBottom sx={{ color: '#333', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Samwise illuminates your thoughts, transforming every conversation into an opportunity for growth.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.4 }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
              <MuiButton
                  variant="contained"
                  size="large"
                  href="https://github.com/chandeldivyam/samwise"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{
                    fontSize: '1.2rem',
                    py: 1.5,
                    px: 3,
                    backgroundColor: '#24292e',
                    '&:hover': {
                      backgroundColor: '#1c2024',
                    },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  GitHub
                  {starCount !== null && (
                    <Box
                      component="span"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ml: 2,
                        pl: 2,
                        borderLeft: '1px solid rgba(255,255,255,0.3)',
                        transition: 'opacity 0.3s ease-in-out',
                        opacity: starCount === null ? 0 : 1,
                      }}
                    >
                      <StarIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                      {starCount.toLocaleString()}
                    </Box>
                  )}
                </MuiButton>

                <MuiButton
                  variant="contained"
                  size="large"
                  href="https://discord.gg/hU87q8ME"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<DiscordIcon />}
                  sx={{
                    fontSize: '1.2rem',
                    py: 1.5,
                    px: 4,
                    backgroundColor: '#5865F2',
                    '&:hover': {
                      backgroundColor: '#4752C4',
                    }
                  }}
                >
                  Discord
                </MuiButton>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sx={{ maxWidth: 800, width: '100%' }}> 
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 0.8 }}
            >
              <Box
                sx={{
                  width: '100%',
                  margin: '2rem auto',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  src="https://www.youtube.com/embed/iuOJwIRKb50"
                  title="Samwise Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;