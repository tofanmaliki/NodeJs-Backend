// routes/userRoutes.js
import express from 'express';
import { createEmployee,getEmployeeDetails,getEmployees } from '../controllers/employeeController.js';

const router = express.Router();
router.post('/create-employee', createEmployee);
router.get('/get-employee-detail/:email', getEmployeeDetails);
router.get('/get-employees', getEmployees);
  
export default router;