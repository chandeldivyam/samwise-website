import React from 'react';
import { Box, Container, Typography, Grid, Paper, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { color, motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import DescriptionIcon from '@mui/icons-material/Description';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutomationIcon from '@mui/icons-material/AutoFixHigh';
import InsightsIcon from '@mui/icons-material/Insights';
import SyncIcon from '@mui/icons-material/Sync';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import GitHubIcon from '@mui/icons-material/GitHub';

interface RoadmapItem {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  icon: React.ReactNode;
  color: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Local Conversation Recording",
    icon: <MicIcon />,
    description: "Implement local recording without requiring a bot in meetings.",
    status: "completed",
    color: "#4CAF50",
  },
  {
    title: "Post-Meeting Transcription",
    icon: <DescriptionIcon />,
    description: "Develop API-based transcription for recorded conversations.",
    status: "completed",
    color: "#2196F3",
  },
  {
    title: "LLM-Powered Analysis",
    icon: <PsychologyIcon />,
    description: "Integrate LLMs for generating summaries, action items, and facilitating deeper discussions.",
    status: "completed",
    color: "#FF9800",
  },
  {
    title: "AI Powered Insights",
    icon: <AutomationIcon />,
    description: "Insights about the speech, tone, and clarity. Methods to improve the conversation.",
    status: "in-progress",
    color: "#9C27B0",
  },
  {
    title: "Enhanced Data Organisation",
    icon: <FolderCopyIcon />,
    description: "Project-Based Organization with RAG implementation for better data management.",
    status: "in-progress",
    color: "#DD1BB0",
  },
  {
    title: "Real-Time Transcription",
    icon: <SyncIcon />,
    description: "Develop live, real-time transcription capabilities.",
    status: "planned",
    color: "#E91E63",
  },
  {
    title: "Post-Conversation Insights",
    icon: <InsightsIcon />,
    description: "Generate advanced analytics and insights after conversations.",
    status: "planned",
    color: "#00BCD4",
  },
  {
    title: "Scenario-Based Practice",
    icon: <TheaterComedyIcon />,
    description: "Create real-time practice environments for specific scenarios.",
    status: "planned",
    color: "#FFC107",
  },
  {
    title: "Real-Time Conversation Guidance",
    icon: <TrendingUpIcon />,
    description: "Provide real-time course correction and advice during live conversations.",
    status: "planned",
    color: "#3F51B5",
  },
];

const RoadmapSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getStatusColumn = (status: string) => {
    return roadmapItems.filter(item => item.status === status);
  };

  const MotionPaper = motion(Paper);

  return (
    <Box sx={{ py: 10, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Our Roadmap
        </Typography>
        <Grid container spacing={3}>
          {['completed', 'in-progress', 'planned'].map((status) => (
            <Grid item xs={12} md={4} key={status}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: status === 'completed' ? '#e8f5e9' : status === 'in-progress' ? '#fff3e0' : '#fce4ec',
                }}
              >
                <Typography variant="h6" gutterBottom align="center" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                  {status.replace('-', ' ')}
                </Typography>
                {getStatusColumn(status).map((item, index) => (
                  <MotionPaper
                    key={index}
                    elevation={1}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      borderLeft: `4px solid ${item.color}`,
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ color: item.color, mr: 1 }}>{item.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                  </MotionPaper>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {"We're Building This Open Source! 🚀"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {"We'd love your feedback and feature suggestions. Join the discussion on GitHub."}
          </Typography>
          <Button
            variant="contained"
            style={{backgroundColor: "#000"}}
            startIcon={<GitHubIcon />}
            href="https://github.com/chandeldivyam/samwise/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request Feature
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RoadmapSection;
