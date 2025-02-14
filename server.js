const express = require('express');
const path = require('path');
const app = express();

// Serve the production React build
app.use(express.static(path.join(__dirname, 'build')));

// Redirect all routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// OpenShift assigns a dynamic port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});