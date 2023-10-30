// Create web server for comments

// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create express app
const app = express();

// Use cors
app.use(cors());

// Use body parser
app.use(bodyParser.json());

// Set port
const port = 3001;

// Get comments
app.get('/api/comments', (req, res) => {
    // Read comments from file
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file');
        } else {
            // Parse comments
            const comments = JSON.parse(data);

            // Send comments
            res.send(comments);
        }
    });
});

// Add comment
app.post('/api/comments', (req, res) => {
    // Get comment from request body
    const comment = req.body;

    // Read comments from file
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file');
        } else {
            // Parse comments
            const comments = JSON.parse(data);

            // Add comment to comments
            comments.push(comment);

            // Write comments to file
            fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
                if (err) {
                    res.status(500).send('Error writing comments file');
                } else {
                    // Send comment
                    res.send(comment);
                }
            });
        }
    });
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));