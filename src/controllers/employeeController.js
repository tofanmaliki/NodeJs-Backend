// controllers/authController.js
import EmployeeModel from '../models/EmployeeModel.js';
import { saveEmployee,getEmployeeDetail,getEmployee } from '../services/employeeService.js';

export const createEmployee = async (req, res) => {
    const {email} = req.body;
    // Validate required fields
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
  
    // Create employee instance
    const employee = new EmployeeModel(req.body);
  
    try {
        // simpan employee 
        const response = await saveEmployee(employee);
        if (response.success) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error('Error in user registration:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Registration failed. Please try again later.' 
        });
    }
  };

  export const getEmployeeDetails = async (req, res) => {
    const { email } = req.params;
  
    const response = await getEmployeeDetail(email);
   
    res.status(200).json(response);
  };

  export const getEmployees = async (req, res) => {
      const response = await getEmployee();
      res.status(200).json(response);
  };