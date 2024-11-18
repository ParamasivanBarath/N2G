const express = require('express');
const router = express.Router();
const db = require('../db');

// Create bookings table
const createBookingsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      patient_id INT,
      patient_name VARCHAR(100),
      therapist_id INT,
      therapist_name VARCHAR(100),
      allotted_slot VARCHAR(50),
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating bookings table:', err);
    } else {
      console.log('Bookings table checked/created successfully');
    }
  });
};

// Create new booking
router.post('/', (req, res) => {
  const { slotId, patientId, therapistId, date } = req.body;

  const updateSlotSql = "UPDATE slots SET is_available = false WHERE id = ?";
  db.query(updateSlotSql, [slotId], (slotError) => {
    if (slotError) {
      return res.status(500).send("Error updating slot availability");
    }

    const fetchDetailsSql = `
      SELECT s.time, p.patient_name, t.name AS therapist_name
      FROM slots s
      JOIN patients p ON p.id = ?
      JOIN therapists t ON t.id = ?
      WHERE s.id = ?
    `;

    db.query(fetchDetailsSql, [patientId, therapistId, slotId], (detailsError, detailsResults) => {
      if (detailsError || detailsResults.length === 0) {
        return res.status(500).send("Error fetching details");
      }

      const { time: allottedSlotTime, patient_name: patientName, therapist_name: therapistName } = detailsResults[0];

      const bookingSql = "INSERT INTO bookings(patient_id, patient_name, therapist_id, therapist_name, allotted_slot, date) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(bookingSql, [patientId, patientName, therapistId, therapistName, allottedSlotTime, date], (bookingError) => {
        if (bookingError) {
          return res.status(500).send("Error inserting booking record");
        }
        res.json({ message: "Slot booked successfully" });
      });
    });
  });
});

// Get therapist bookings
router.get('/therapist/:therapistId', (req, res) => {
  const { therapistId } = req.params;
  const sql = "SELECT * FROM bookings WHERE therapist_id = ? ORDER BY date, allotted_slot";
  db.query(sql, [therapistId], (error, result) => {
    if (error) {
      return res.status(500).send("Error fetching therapist bookings");
    }
    res.json(result);
  });
});

// Cancel booking
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM bookings WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).send("Error cancelling appointment");
    }
    res.json({ message: "Appointment cancelled successfully" });
  });
});

module.exports = { router, createBookingsTable };