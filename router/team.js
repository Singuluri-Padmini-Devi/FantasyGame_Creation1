const express = require('express');
const router = express.Router();
const Team = require('../models/team');

// POST create a new team
router.post('/', async (req, res) => {
    const { name, players } = req.body;
    const team = new Team({ name, players });
    try {
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('players');
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
