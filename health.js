module.exports = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development'
  });
};