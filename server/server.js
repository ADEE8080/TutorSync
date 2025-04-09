import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';

// Initialize Express
const app = express();

// Connect to database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors());
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course',express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({type:'application/json'}),stripeWebhooks)


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
