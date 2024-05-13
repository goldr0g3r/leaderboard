import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'leaderboard';

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }

    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Define your routes here
    // Example: app.get('/leaderboard', (req, res) => { ... });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});