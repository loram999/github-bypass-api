const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    message: 'GitHub Bypass API is running',
    endpoints: {
      upload: '/api/upload',
      stats: '/api/stats',
      health: '/api/health'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    totalUsers: 0,
    totalFiles: 0,
    status: 'operational'
  });
});

// Upload endpoint
const upload = multer({ dest: '/tmp/uploads/' });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({ 
      success: true, 
      message: 'File uploaded successfully',
      filename: req.file.originalname 
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    available: ['/', '/api/health', '/api/stats', '/api/upload']
  });
});

module.exports = app;
