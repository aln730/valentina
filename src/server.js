const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all routes and serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use the OpenShift-provided PORT or default to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});