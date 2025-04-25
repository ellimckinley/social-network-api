import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';
// import dotenv from 'dotenv';
// dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const startServer = async () => {
  try {
    await db(); // Connect to MongoDB
    console.log('🌐 MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 API server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error connecting to the database:', err);
  }
};

startServer();
