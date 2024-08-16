// .\src/components/layout/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Container, Box } from '@mui/material';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: '80px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '60px', width: '146px', position: 'relative' }}>
            <Image 
              src="/cover.png" 
              alt="Samwise Logo" 
              layout="fill"
              objectFit="contain"
              priority
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;