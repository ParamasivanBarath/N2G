const express = require('express');
const router = express.Router();
const db = require('../db');
const patientRoutes = require('./Routes/patient').router;
app.use('/patients', patientRoutes);


// Create patients table
const createPatientsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id VARCHAR(20) NOT NULL UNIQUE,
      patient_name VARCHAR(100) NOT NULL,
      dob DATE NOT NULL,
      email VARCHAR(100) NOT NULL,
      caregiver_name_relation VARCHAR(255) NOT NULL,
      caregiver_contact_number VARCHAR(15),
      complaint_details TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating patients table:', err);
    } else {
      console.log('Patients table checked/created successfully');
    }
  });
};

// Generate sequential patient ID
const generateSequentialPatientId = (callback) => {
  const sql = 'SELECT patient_id FROM patients ORDER BY patient_id DESC LIMIT 1';
  db.query(sql, (err, rows) => {
    if (err) return callback(err, null);
    
    let lastId = rows.length > 0 ? rows[0].patient_id : 'CK20240000';
    const lastNumber = parseInt(lastId.substring(6), 10);
    const newPatientId = `CK2024${String(lastNumber + 1).padStart(4, '0')}`;
    callback(null, newPatientId);
  });
};

// Get all patients
router.get('/', (req, res) => {
  const sql = "SELECT * FROM patients";
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).send("Error fetching patients");
    }
    res.json(result);
  });
});

// Get available patients
router.get('/available', (req, res) => {
  const sql = "SELECT * FROM patients WHERE id NOT IN (SELECT patient_id FROM bookings)";
  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).send("Error fetching available patients");
    }
    res.json(result);
  });
});

router.post('/submit', (req, res) => {
    const formData = req.body;
    
    // Validate required fields
    if (!formData.patientName || !formData.dob || !formData.email || !formData.caregiverNameRelation) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
  
    generateSequentialPatientId((err, patientId) => {
      if (err) {
        console.error('Error generating patient ID:', err);
        return res.status(500).json({ message: "Error generating patient ID" });
      }
  
      const sql = `
        INSERT INTO patients(
          patient_id, patient_name, dob, email,
          caregiver_name_relation, caregiver_contact_number,
          complaint_details
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      db.query(sql, [
        patientId,
        formData.patientName,
        formData.dob,
        formData.email,
        formData.caregiverNameRelation,
        formData.caregiverContactNumber || null,
        formData.complaintDetails || null
      ], (err, result) => {
        if (err) {
          console.error('Error submitting form:', err);
          return res.status(500).json({ message: "Error submitting form" });
        }
        res.status(200).json({ 
          message: "Form submitted successfully!",
          patientId: patientId 
        });
      });
    });
  });

module.exports = { router, createPatientsTable };