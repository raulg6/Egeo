const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const fs = require('fs');

const app = express();
const port = 3000;

// Read MongoDB Atlas credentials from JSON file
const credentials = JSON.parse(fs.readFileSync('user.json'));

// Construct MongoDB connection URI
const uri = `mongodb+srv://${credentials.username}:${credentials.password}@${credentials.cluster}.mongodb.net`;

// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect().then(() => {
    console.log("Connected to MongoDB");

    // Database Name
    const dbName = 'egeo_emails';
    const db = client.db(dbName);

    // Middleware to parse JSON bodies
    app.use(bodyParser.json());

    // Middleware to set CORS headers
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your frontend origin
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    // Endpoint to handle email submissions
    app.post('/submit_email', async (req, res) => {
        const email = req.body.email;

        try {
            // Insert email into MongoDB collection
            const result = await db.collection('emails').insertOne({ email: email });
            console.log("Email inserted:", email);
            res.status(201).json({ success: true, message: "Email submitted successfully" });
        } catch (err) {
            console.error("Error inserting email:", err);
            res.status(500).json({ success: false, message: "An error occurred while processing the request" });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
})
.catch(err => {
    console.error("Error connecting to MongoDB:", err);
});