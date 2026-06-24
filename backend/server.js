import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes.route.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}
app.use(express.json());
// Apply rate limiter to all routes
app.use(rateLimiter);

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/notes', notesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Express 5 fix: use middleware, not app.get("/*")
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
};

startServer();

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// });


// import express from 'express';
// import cors from 'cors';
// import notesRouter from './routes/notes.route.js';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import {connectDB} from './config/db.js';
// import {rateLimit} from './config/upstash.js';


// dotenv.config();

// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// app.use(express.json());
// app.use(rateLimit); // Apply rate limiting middleware to all routes
// app.use('/api/notes', notesRouter);


// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
