const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

const dbURI = 'mongodb://127.0.0.1:27017/School';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema to connect to existing "students" collection
const studentSchema = new mongoose.Schema({}, { collection: 'students' });
const Student = mongoose.model('Student', studentSchema);

// Serve static HTML from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// API to fetch all students
app.get('/api/data', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
