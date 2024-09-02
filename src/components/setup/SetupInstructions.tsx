// src/components/setup/SetupInstructions.tsx
import React, { useState, useMemo } from 'react';
import { 
  Container, Typography, Box, Button, Paper, List, ListItem, ListItemText, ListItemIcon,
  Collapse, TextField, useTheme, useMediaQuery, IconButton, Tooltip, Drawer
} from '@mui/material';
import Image from 'next/image';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ImageGallery from './ImageGallery';
import SanitizedHTML from './SanitizedHTML';

interface SetupStep {
    id: string;
    label: string;
    description: string;
    images: { src: string; alt: string }[];
    estimatedTime?: string;
    command?: string;
    troubleshooting?: string;
    tips?: string[];
}
    

interface SetupSection {
  title: string;
  steps: SetupStep[];
}

const macSetup: SetupSection[] = [
  {
    title: "Installation",
    steps: [
      {
        id: "mac-download",
        label: "Downloading the Installer",
        description: "After filling the email, a download process will begin.",
        images: [
            { src: "/setup/mac/step1.png", alt: "Download page" },
            { src: "/setup/mac/step1b.png", alt: "Download progress" }
        ],
        tips: ["macOS 10.15 or later is required"]
      },
      {
        id: "mac-install",
        label: "Install from the binary",
        description: `After the download is completed, we will have to install the package.
        Right click to and press Open. The system might warn about the developer signature. We are opensource, please look into our <a href="https://github.com/chandeldivyam/samwise">codebase</a> for security concerns.`,
        images: [
            { src: "/setup/mac/step2a.png", alt: "Unsigned Error in installation" },
            { src: "/setup/mac/step2b.png", alt: "Right click to open to bypass the setting" },
            { src: "/setup/mac/step2c.png", alt: "Unverified Open" },
            { src: "/setup/mac/step2d.png", alt: "Drag and drop to Application folder to install" },
        ],
        troubleshooting: "The MacOS will show an error if we double click to open it. Please right click the installer and click 'open' to run. We are fully opensource and free to use while developer signature is expensive and hence this is the case."
      },
      {
        id: "mac-open",
        label: "Run the application",
        description: `The first time, we will have to run the application by Right Click and 'Open' in the Applications folder.`,
        images: [
            { src: "/setup/mac/step3a.png", alt: "Unsigned Error in installation" },
            { src: "/setup/mac/step3b.png", alt: "Right click to open" },
            { src: "/setup/mac/step3c.png", alt: "Default home page for samwise" },
        ],
        troubleshooting: "The MacOS will show an error if we double click to open it. Please right click the installer and click 'open' to run. We are fully opensource and free to use while developer signature is expensive and hence this is the case."
      },
    ]
  },
  {
    title: "Setup For Transcription",
    steps: [
      {
        id: "download-whisper-model",
        label: "Opensource Models",
        description: `🎉 Congratulations! We are all set for the next steps. We now have to setup the application for worldclass transcriptions.
        Once the application starts, we will download the opensource 'whisper model'`,
        images: [
            { src: "/setup/mac/step4a.png", alt: "Download transcription model" },
        ],
      },
      {
        id: "samwise-access",
        label: "Permission Management",
        description: `After the transcription is started, we will have to grant the access for microphone and screencapture to the application. Don't worry the data never leaves your system.
        For the access, we will have to quit and reopen the app. This is just 1 time setup.`,
        images: [
            { src: "/setup/mac/step5a.png", alt: "Microphone access" },
            { src: "/setup/mac/step5b.png", alt: "Speaker Access" },
            { src: "/setup/mac/step5c.png", alt: "Speaker Access" },
            { src: "/setup/mac/step5d.png", alt: "Speaker Access" },
            { src: "/setup/mac/step5e.png", alt: "Speaker Access" },
        ],
      },
    ]
  },
  {
    title: "Summarization and Chat",
    steps: [
      {
        id: "setup-llm",
        label: "Setup LLM",
        description: `We are all set to transcribe right now. But to get enhanced summaries and chat option, we will have to setup the choice of LLMs in the Setting
        We can use local LLMs (Ollama) or Hosted services like (OpenAI or Gemini)`,
        images: [
            { src: "/setup/mac/step6a.png", alt: "Select Settings" },
            { src: "/setup/mac/step6b.png", alt: "Settings Page" },
            { src: "/setup/mac/step6c.png", alt: "Select LLM" },
            { src: "/setup/mac/step6d.png", alt: "Chat Section" },
        ],
      },
    ]
  }
];

const windowsSetup: SetupSection[] = [
  {
    title: "Installation",
    steps: [
      {
        id: "windows-install",
        label: "Install from the binary",
        description: `After the download is completed, we will have to install the package. When we run the package, there would be a popup for security by windows.
        We are opensource and free for everyone. Developer Signature is expensive, therefore we have not added it. Please feel free to checkout the <a href="https://github.com/chandeldivyam/samwise">source code</a>`,
        images: [
            { src: "/setup/windows/step1a.png", alt: "Unsigned Error in installation" },
            { src: "/setup/windows/step1c.png", alt: "Unsigned Error in installation" },
            { src: "/setup/windows/step1b.png", alt: "Unsigned Error in installation" },
        ],
        troubleshooting: "Windows might show some security concerns. Please feel free to check our codebase."
      }
    ]
  }
];

const SetupInstructions: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>("");
  const [platform, setPlatform] = useState<'mac' | 'windows'>('mac');
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const setup = platform === 'mac' ? macSetup : windowsSetup;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSectionToggle = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleStepClick = (stepId: string) => {
    setActiveStepId(stepId);
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  const filteredSetup = useMemo(() => {
    if (!searchTerm) return setup;
    return setup.map(section => ({
      ...section,
      steps: section.steps.filter(step => 
        step.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        step.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(section => section.steps.length > 0);
  }, [setup, searchTerm]);

  const currentStep = useMemo(() => {
    for (const section of setup) {
      const step = section.steps.find(s => s.id === activeStepId);
      if (step) return step;
    }
    return setup[0].steps[0];  // Default to first step if not found
  }, [setup, activeStepId]);

  const currentSection = useMemo(() => {
    return setup.find(section => section.steps.some(step => step.id === activeStepId)) || setup[0];
  }, [setup, activeStepId]);
  
  const currentStepNumber = useMemo(() => {
    return currentSection.steps.findIndex(step => step.id === activeStepId) + 1;
  }, [currentSection, activeStepId]);
  
  const totalSteps = useMemo(() => {
    return currentSection.steps.length;
  }, [currentSection]);

  const renderNavigation = () => (
    <Box sx={{ width: 280, flexShrink: 0 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search steps..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        sx={{ mb: 2 }}
      />
      {filteredSetup.map((section) => (
        <React.Fragment key={section.title}>
          <ListItem button onClick={() => handleSectionToggle(section.title)}>
            <ListItemText primary={section.title} />
            {expandedSections.includes(section.title) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedSections.includes(section.title)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {section.steps.map((step) => (
                <ListItem
                  button
                  key={step.id}
                  sx={{ pl: 4 }}
                  selected={activeStepId === step.id}
                  onClick={() => handleStepClick(step.id)}
                >
                  <ListItemText primary={step.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1">
          Set Up Samwise
        </Typography>
        <Box>
          <Button
            variant={platform === 'mac' ? 'contained' : 'outlined'}
            onClick={() => setPlatform('mac')}
            sx={{ mr: 2 }}
          >
            Mac
          </Button>
          <Button
            variant={platform === 'windows' ? 'contained' : 'outlined'}
            onClick={() => setPlatform('windows')}
            sx={{ mr: 2 }}
          >
            Windows
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        {isMobile ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileNavOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          renderNavigation()
        )}

        <Box sx={{ flexGrow: 1, ml: { sm: 4 } }}>
          <Paper elevation={3} sx={{ p: 4, backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Step {currentStepNumber} of {totalSteps}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {currentStep.label}
            </Typography>
            <Typography variant="body1" component="div" paragraph>
              <SanitizedHTML html={currentStep.description} />
            </Typography>
            {currentStep.estimatedTime && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Estimated time: {currentStep.estimatedTime}
            </Typography>}

            <ImageGallery
              images={currentStep.images.map((img, index) => ({
                ...img,
                caption: `Step ${currentStepNumber}.${index + 1}: ${img.alt}`,
              }))}
            />

            {currentStep.command && (
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" component="code" sx={{ mr: 2, p: 1, backgroundColor: darkMode ? '#555' : '#f5f5f5', borderRadius: 1 }}>
                  {currentStep.command}
                </Typography>
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={() => navigator.clipboard.writeText(currentStep.command!)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            {currentStep.tips && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Tips:
                </Typography>
                <ul>
                  {currentStep.tips.map((tip, index) => (
                    <li key={index}>
                      <Typography variant="body2">{tip}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {currentStep.troubleshooting && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <ErrorOutlineIcon sx={{ mr: 1 }} color="warning" />
                  Troubleshooting
                </Typography>
                <Typography variant="body2">{currentStep.troubleshooting}</Typography>
              </Box>
            )}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                onClick={() => {
                  const flatSteps = setup.flatMap(section => section.steps);
                  const currentIndex = flatSteps.findIndex(step => step.id === currentStep.id);
                  if (currentIndex > 0) {
                    setActiveStepId(flatSteps[currentIndex - 1].id);
                  }
                }}
                disabled={currentStepNumber === 1}
              >
                Previous
              </Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  const flatSteps = setup.flatMap(section => section.steps);
                  const currentIndex = flatSteps.findIndex(step => step.id === currentStep.id);
                  if (currentIndex < flatSteps.length - 1) {
                    setActiveStepId(flatSteps[currentIndex + 1].id);
                  }
                }}
                disabled={currentStepNumber === totalSteps}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      >
        {renderNavigation()}
      </Drawer>
    </Container>
  );
};

export default SetupInstructions;