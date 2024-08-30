import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal, Box, Typography, Button, Grid, IconButton, CircularProgress, Fade, Zoom, TextField, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WindowsIcon from '@mui/icons-material/Microsoft';
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from '../../utils/LinuxIcon';
import { trackButtonClick } from '@/utils/posthog';
import confetti from 'canvas-confetti';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
}

interface DownloadButtonProps {
  asset: { browser_download_url: string; size: number } | undefined;
  os: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  isSelected: boolean;
}

interface Release {
  tag_name: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
}

const DownloadButton: React.FC<DownloadButtonProps> = React.memo(({ asset, os, icon, color, onClick, isSelected }) => (
  <Zoom in={true}>
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      sx={{
        backgroundColor: isSelected ? color : 'rgba(255, 255, 255, 0.7)',
        color: isSelected ? 'white' : 'black',
        '&:hover': { 
          backgroundColor: isSelected ? color : 'rgba(255, 255, 255, 0.9)', 
          filter: 'brightness(110%)',
          transform: 'scale(1.05)',
          transition: 'all 0.3s ease-in-out'
        },
        textTransform: 'none',
        borderRadius: 3,
        fontWeight: 'bold',
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        boxShadow: 3,
        transition: 'all 0.3s ease-in-out',
        opacity: asset ? 1 : 0.5,
        cursor: asset ? 'pointer' : 'not-allowed',
      }}
    >
      <Box sx={{ mb: 1, fontSize: '2rem', color: isSelected ? 'white' : color }}>{icon}</Box>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        {os}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {asset ? `${(asset.size / 1024 / 1024).toFixed(1)} MB` : 'Coming soon!'}
      </Typography>
    </Button>
  </Zoom>
));

DownloadButton.displayName = 'DownloadButton';

const DownloadModal: React.FC<DownloadModalProps> = ({ open, onClose }) => {
  const [releases, setReleases] = useState<Release | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<{ url: string; name: string } | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      fetch('https://api.github.com/repos/chandeldivyam/samwise/releases/latest')
        .then(response => response.json())
        .then((data: Release) => {
          setReleases(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching release data:', error);
          setIsLoading(false);
        });
    }
  }, [open]);

  const handleAssetSelection = useCallback((url: string, name: string) => {
    setSelectedAsset({ url, name });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);
  
    setIsSubmitting(true);
    try {
      // Start the download
      window.location.href = selectedAsset.url;
  
      // Submit the email and download info
      const response = await fetch('/api/loops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          downloadUrl: selectedAsset.url,
          applicationName: selectedAsset.name,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit');
      }
  
      setSnackbarMessage('Thank you! Your download has started. Check your email for additional instructions.');
      setSnackbarOpen(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onClose();
    } catch (error) {
      console.error('Error submitting:', error);
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const assets = useMemo(() => {
    if (!releases) return null;
    return {
      windowsAsset: releases.assets.find(asset => asset.name.endsWith('.exe')),
      macIntelAsset: releases.assets.find(asset => asset.name.includes('x64.dmg')),
      macM1Asset: releases.assets.find(asset => asset.name.includes('aarch64.dmg')),
      linuxAsset: releases.assets.find(asset => asset.name.endsWith('.deb') || asset.name.endsWith('.rpm'))
    };
  }, [releases]);

  const renderDownloadButtons = useMemo(() => {
    if (!assets) return null;
    const { windowsAsset, macIntelAsset, macM1Asset, linuxAsset } = assets;
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DownloadButton
            asset={windowsAsset}
            os="Windows"
            icon={<WindowsIcon fontSize="large" />}
            color="#0078D7"
            onClick={() => windowsAsset && handleAssetSelection(windowsAsset.browser_download_url, 'Samwise for Windows')}
            isSelected={selectedAsset?.name === 'Samwise for Windows'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DownloadButton
            asset={macIntelAsset}
            os="Mac (Intel)"
            icon={<AppleIcon fontSize="large" />}
            color="#000000"
            onClick={() => macIntelAsset && handleAssetSelection(macIntelAsset.browser_download_url, 'Samwise for Mac (Intel)')}
            isSelected={selectedAsset?.name === 'Samwise for Mac (Intel)'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DownloadButton
            asset={macM1Asset}
            os="Mac (Arm)"
            icon={<AppleIcon fontSize="large" />}
            color="#000000"
            onClick={() => macM1Asset && handleAssetSelection(macM1Asset.browser_download_url, 'Samwise for Mac (Arm)')}
            isSelected={selectedAsset?.name === 'Samwise for Mac (Arm)'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DownloadButton
            asset={linuxAsset}
            os="Linux"
            icon={<LinuxIcon fontSize="large" />}
            color="#dd5814"
            onClick={() => linuxAsset && handleAssetSelection(linuxAsset.browser_download_url, 'Samwise for Linux')}
            isSelected={selectedAsset?.name === 'Samwise for Linux'}
          />
        </Grid>
      </Grid>
    );
  }, [assets, selectedAsset, handleAssetSelection]);

  return (
    <>
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
            outline: 'none',
            backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: 8, 
              color: 'grey.700',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                transform: 'rotate(90deg)',
                transition: 'all 0.3s ease-in-out'
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h3" component="h2" sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 4,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Get Ready for Samwise!
          </Typography>

          <Box sx={{ 
            textAlign: 'center', 
            mb: 4,
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 4,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
            <Typography variant="h5" component="h2" sx={{ 
                fontWeight: 'bold',
                color: '#4a4a4a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
            }}>
                <AutoAwesomeIcon sx={{ mr: 1, color: '#FFA500' }} /> Alpha Release
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
                Free, On-Device, AI-Powered Notetaking
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#888' }}>
                This is just the beginning. Samwise is evolving to revolutionize your communications.
            </Typography>
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <>
              {renderDownloadButtons}

              {selectedAsset && (
                <Box component="form" onSubmit={handleSubmit} sx={{ 
                  mt: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 2,
                  borderRadius: 4,
                  p: 2,
                }}>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={!isEmailValid}
                    helperText={!isEmailValid ? 'Please enter a valid email address' : ''}
                    sx={{ flexGrow: 1, maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.8)', }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: '#FE6B8B',
                      '&:hover': { backgroundColor: '#FF8E53' },
                      borderRadius: 20,
                      px: 4,
                      py: 1,
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Get Access'}
                  </Button>
                </Box>
              )}
            </>
          )}

          <Box sx={{ mt: 4, textAlign: 'center', p: 2, bgcolor: 'rgba(255, 255, 255, 0.7)', borderRadius: 2 }}>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
              🎉 Samwise is open-source and free! But here is the tea... ☕
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              💸 Signing certificates are expensive, so your OS might raise an eyebrow during installation.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              🕵️‍♀️ Dont trust us? We get it! Dive into our codebase on GitHub and see for yourself.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              🚀 Your support means the world to us! Lets make magic happen together!
            </Typography>
            <Button 
              href="https://github.com/chandeldivyam/samwise" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="outlined" 
              sx={{ mt: 2, borderRadius: 20, textTransform: 'none' }}
            >
              🔍 Explore on GitHub
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      message={snackbarMessage}
    />
    </>
  );
};

export default DownloadModal;