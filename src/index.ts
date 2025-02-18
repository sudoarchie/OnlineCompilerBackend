import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const ioServer = new Server(server);

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add middleware to parse JSON
app.use(express.json());

app.post('/api/compiler', async (req:any, res:any) => {
    const { language, code } = req.body;
    
    if (!language || !code) {
        return res.status(400).json({ error: 'Language and code are required' });
    }

    console.log('Language:', language);
    res.json({ message: 'Received language: ' + language });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
