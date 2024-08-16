// .\src/components/layout/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Samwise. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;