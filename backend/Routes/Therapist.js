const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create therapists table
const createTherapistsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS therapists (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      title VARCHAR(255),
      photo VARCHAR(255),
      is_available BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating therapists table:', err);
    } else {
      console.log('Therapists table checked/created successfully');
    }
  });
};

// Get all therapists
router.get('/', (req, res) => {
  const sql = "SELECT * FROM therapists";
  db.query(sql, (error, result) => {
    if (error) {
      console.error("Error fetching therapists:", error);
      return res.status(500).send("Error fetching therapists");
    }
    res.json(result);
  });
});

// Add new therapist
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, title } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO therapists(name, title, photo, is_available) VALUES (?, ?, ?, true)`;
  const values = [name, title, photoPath];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error adding therapist:", error);
      return res.status(500).send("Error adding therapist");
    }
    res.json({ message: "Therapist added", id: result.insertId });
  });
});

// Update therapist
router.put('/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, title } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  let sql;
  let values;

  if (photoPath) {
    sql = `UPDATE therapists SET name=?, title=?, photo=? WHERE id=?`;
    values = [name || null, title || null, photoPath, id];
  } else {
    sql = `UPDATE therapists SET name=?, title=? WHERE id=?`;
    values = [name || null, title || null, id];
  }

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error updating therapist:", error);
      return res.status(500).send("Error updating therapist");
    }
    res.json({ message: "Therapist updated" });
  });
});

// Delete therapist
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM therapists WHERE id = ?";
  
  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Error deleting therapist:", error);
      return res.status(500).send("Error deleting therapist");
    }
    res.json({ message: "Therapist deleted" });
  });
});

// Get available therapists for a specific date
router.get('/available/:date', (req, res) => {
  const { date } = req.params;
  const sql = `
    SELECT DISTINCT t.*
    FROM therapists t
    LEFT JOIN bookings b ON t.id = b.therapist_id AND b.date = ?
    WHERE t.is_available = true AND (b.id IS NULL OR b.date != ?)
  `;
  
  db.query(sql, [date, date], (error, result) => {
    if (error) {
      console.error("Error fetching available therapists:", error);
      return res.status(500).send("Error fetching available therapists");
    }
    res.json(result);
  });
});

// Toggle therapist availability
router.put('/:id/toggle', async (req, res) => {
  const { id } = req.params;

  try {
    const getTherapistSql = "SELECT is_available FROM therapists WHERE id = ?";
    db.query(getTherapistSql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Therapist not found" });
      }

      const currentStatus = results[0].is_available;
      const updateSql = "UPDATE therapists SET is_available = ? WHERE id = ?";
      db.query(updateSql, [!currentStatus, id], (updateError) => {
        if (updateError) {
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Therapist availability toggled successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { router, createTherapistsTable };