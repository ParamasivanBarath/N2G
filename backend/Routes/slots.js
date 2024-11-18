const express = require('express');
const router = express.Router();
const db = require('../db');

// Create slots table
const createSlotsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS slots (
      id INT AUTO_INCREMENT PRIMARY KEY,
      time VARCHAR(50) NOT NULL,
      date DATE NOT NULL,
      is_available BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY unique_slot_date (time, date)
    )
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating slots table:', err);
    } else {
      console.log('Slots table checked/created successfully');
    }
  });
};

// Generate slots for date range
const generateSlotsForDateRange = () => {
  const slotTimes = [
    '10:00 AM - 11:30 AM',
    '11:30 AM - 1:00 PM',
    '2:00 PM - 3:30 PM',
    '3:30 PM - 5:00 PM',
    '5:00 PM - 6:30 PM',
    '6:30 PM - 8:00 PM',
    '8:00 PM - 9:30 PM'
  ];

  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 5);

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split('T')[0];
    const sql = `INSERT IGNORE INTO slots (time, date, is_available) VALUES ?`;
    const values = slotTimes.map(time => [time, formattedDate, true]);

    db.query(sql, [values], (err) => {
      if (err) {
        console.error(`Error initializing slots for ${formattedDate}:`, err);
      }
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }
};

// Get slots by date
router.get('/:date', (req, res) => {
  const { date } = req.params;
  const sql = "SELECT * FROM slots WHERE date = ? ORDER BY time";
  db.query(sql, [date], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching slots');
    }
    res.json(results);
  });
});

// Get available slots by date
router.get('/available/:date', (req, res) => {
  const { date } = req.params;
  const sql = "SELECT * FROM slots WHERE date = ? AND is_available = true ORDER BY time";
  db.query(sql, [date], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching available slots');
    }
    res.json(results);
  });
});

// Toggle slot availability
router.put('/:id/toggle', async (req, res) => {
  const { id } = req.params;
  try {
    const getSlotSql = "SELECT is_available FROM slots WHERE id = ?";
    db.query(getSlotSql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Slot not found" });
      }

      const currentStatus = results[0].is_available;
      const updateSql = "UPDATE slots SET is_available = ? WHERE id = ?";
      db.query(updateSql, [!currentStatus, id], (updateError) => {
        if (updateError) {
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Slot availability toggled successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { router, createSlotsTable, generateSlotsForDateRange };