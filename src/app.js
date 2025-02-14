// app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { checkConnection } from './config/db.js';
import createAllTable from './utils/dbUtils.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import cors from 'cors'

const app = express();
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/users', userRoutes); // Use user routes for API calls
app.use('/api/auth', authRoutes); // Use user routes for API calls
app.use('/api/employee', employeeRoutes); // Use user routes for API calls

app.listen(4001, async() => {
  console.log('Server running on port 4001');
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});

