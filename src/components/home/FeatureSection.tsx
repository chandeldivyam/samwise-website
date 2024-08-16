import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    title: "Rapid Growth",
    icon: <TrendingUpIcon fontSize="large" />,
    description: "Turn every conversation into a learning moment. Get instant feedback, apply it immediately. Years of growth, compressed into days.",
    color: "#4CAF50",
    image: "/feature_image1.png",
  },
  {
    title: "Thought Clarity",
    icon: <LightbulbOutlinedIcon fontSize="large" />,
    description: "Sharpen your ideas. Uncover new angles. Transform complex thoughts into powerful, concise messages that resonate.",
    color: "#2196F3",
    image: "/feature_image2.png",
  },
  {
    title: "AI-Powered Intelligence",
    icon: <AnalyticsIcon fontSize="large" />,
    description: "Elevate your conversational strategy. Anticipate. Adapt. Communicate with precision and impact in any situation.",
    color: "#FF9800",
    image: "/feature_image3.png",
  },
];

const FeatureSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ py: { xs: 6, md: 12 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ mb: 4, fontSize: { xs: '2rem', md: '3rem' } }}>
                Elevate Your Communication
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
                {"Samwise is Opensource and Free. Made with ❤️. Here's how it can help you:"}
              </Typography>
              {features.map((feature, index) => (
                <Paper
                  key={index}
                  elevation={activeFeature === index ? 3 : 0}
                  sx={{
                    p: 2,
                    mb: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: activeFeature === index ? `${feature.color}11` : 'transparent',
                    '&:hover': {
                      backgroundColor: `${feature.color}22`,
                    },
                  }}
                  onClick={() => setActiveFeature(index)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <IconButton
                      sx={{
                        color: feature.color,
                        backgroundColor: `${feature.color}22`,
                        mr: 2,
                      }}
                    >
                      {feature.icon}
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{
                        color: activeFeature === index ? feature.color : 'text.primary',
                        fontWeight: 'bold',
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      ml: 7,
                      display: activeFeature === index ? 'block' : 'none',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ height: { xs: 300, md: 500 }, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 0 30px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${features[activeFeature].image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1,
                      }}
                    />
                    <Box
                      component={motion.div}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${features[activeFeature].color}33`,
                          `0 0 60px ${features[activeFeature].color}66`,
                          `0 0 20px ${features[activeFeature].color}33`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0,
                      }}
                    />
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;