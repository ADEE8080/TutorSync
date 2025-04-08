import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // global json middleware

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.post('/clerk', clerkWebhooks);

// Start Server after DB is connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();
