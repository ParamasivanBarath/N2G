const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./Routes/users').router;
const patientRoutes = require('./Routes/patient').router;
const slotRoutes = require('./Routes/slots').router;
const therapistRoutes = require('./Routes/Therapist').router;
const appointmentRoutes = require('./Routes/Appointment').router;

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/users', userRoutes);
app.use('/patients', patientRoutes);
app.use('/slots', slotRoutes);
app.use('/therapists', therapistRoutes);
app.use('/appointments', appointmentRoutes);

// Initialize tables
require('./Routes/users').createUsersTable();
require('./Routes/patient').createPatientsTable();
require('./Routes/slots').createSlotsTable();
require('./Routes/Therapist').createTherapistsTable();
require('./Routes/Appointment').createBookingsTable();

// Generate initial slots
require('./Routes/slots').generateSlotsForDateRange();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});