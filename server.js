const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fantasyGame', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/players', playerRoutes);
app.use('/teams', teamRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
