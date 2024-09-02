// .\src\components\layout\Header.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { AppBar, Toolbar, Container, Box, Button, useMediaQuery, Typography } from '@mui/material';
import Image from 'next/image';
import DownloadModal from '../common/DownloadModal'; 
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; 

const Header: React.FC = () => {
  const router = useRouter(); // Initialize useRouter
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    router.push('/setup');
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: '80px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '60px', width: '146px', position: 'relative', cursor: 'pointer' }} onClick={() => router.push('/')}> 
            <Image 
              src="/cover.png" 
              alt="Samwise Logo" 
              layout="fill"
              objectFit="contain"
              priority
            />
          </Box>
          <Button 
            variant="contained" 
            onClick={handleOpen}
            startIcon={<RocketLaunchIcon />}
            sx={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              color: 'white',
              borderRadius: '28px',
              padding: '10px 24px',
              textTransform: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              "&:hover": {
                backgroundColor: '#E91E63',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
              }
            }}
          >
            Free Download
          </Button>
        </Toolbar>
      </Container>
      <DownloadModal open={open} onClose={handleClose} /> 
    </AppBar>
  );
};

export default Header;