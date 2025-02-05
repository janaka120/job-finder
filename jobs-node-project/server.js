const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 6001;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/node-jobs-db', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for your data
const jobSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate job IDs
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  company: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      contactEmail: {
        type: String,
        validate: {
          validator: function(email) {
            return /^[\w-.]+@([\w-]+.)+[a-zA-Z]{2,4}$/.test(email);
          },
          message: props => `${props.value} is not a valid email!`
        }
      },
      contactPhone: {
        type: String
      }
    }),
    required: true
  }
});

// Create a model based on the schema
const Jobs = mongoose.model('Jobs', jobSchema);


// Routes
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Route to get Job data by ID
app.get('/jobs/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId; 
    const job = await Jobs.findOne({ id: jobId }); 

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/job', async (req, res) => {
  try {
    console.log("body >>>", req.body);
    const newJob = new Jobs({
      "id": "1",
      "title": "Senior Vue Developer",
      "type": "Full-Time",
      "description": "We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as Vue or Angular.",
      "location": "Boston, MA",
      "salary": "$70K - $80K",
      "company": {
        "name": "NewTek Solutions",
        "description": "NewTek Solutions is a leading technology company specializing in web development and digital solutions. We pride ourselves on delivering high-quality products and services to our clients while fostering a collaborative and innovative work environment.",
        "contactEmail": "contact@teksolutions.com",
        "contactPhone": "555-555-5555"
      }
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});