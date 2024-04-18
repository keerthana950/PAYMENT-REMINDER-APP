 const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/payment_reminder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define Reminder Schema
const reminderSchema = new mongoose.Schema({
  phoneNumber: String,
  dateTime: Date
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Routes
app.post('/setReminder', async (req, res) => {
  const { phoneNumber, dateTime } = req.body;

  const newReminder = new Reminder({
    phoneNumber,
    dateTime
  });

  try {
    await newReminder.save();
    res.send('Reminder set successfully!');
  } catch (error) {
    console.error('Error setting reminder:', error);
    res.status(500).send('Error setting reminder');
  }
});

// Route to retrieve all reminders from the database
app.get('/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find().lean();
    res.json(reminders);
  } catch (error) {
    console.error('Error retrieving reminders:', error);
    res.status(500).send('Error retrieving reminders from database');
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
