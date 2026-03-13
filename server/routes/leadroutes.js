const express = require('express');
const Lead = require('../models/Lead');
const Task = require('../models/Task');
const Photographer = require('../models/Photographer');
const Notification = require('../models/Notification');

const router = express.Router();

router.get('/', async (req, res) => {
    const leads = await Lead.find().populate('tasks');
    res.json(leads);
});

router.post('/', async (req, res) => {
    const lead = new Lead(req.body);
    await lead.save();

    await Notification.create({
        title: "New Lead Acquired",
        description: `${lead.name} has been added to the registry as a new ${lead.status} lead.`,
        type: "Lead"
    });

    res.json(lead);
});

// Task specific management
router.post('/:id/tasks', async (req, res) => {
    const task = new Task({ ...req.body, lead: req.params.id });
    await task.save();
    await Lead.findByIdAndUpdate(req.params.id, { $push: { tasks: task._id } });
    res.json(task);
});

// PATCH Lead
router.patch('/:id', async (req, res) => {
    try {
        const oldLead = await Lead.findById(req.params.id);
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (req.body.status && oldLead && oldLead.status !== req.body.status) {
            await Notification.create({
                title: "Lead Status Updated",
                description: `${updatedLead.name}'s status was changed to ${req.body.status}.`,
                type: "Lead"
            });
        }

        res.json(updatedLead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Remind Photographer
router.post('/:id/remind/:photographerName', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        const photographer = await Photographer.findOne({ name: req.params.photographerName });

        if (!lead || !photographer) {
            return res.status(404).json({ message: "Lead or Photographer not found" });
        }

        res.json({ message: "Reminder mocked (Email service invalid)" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Lead
router.delete('/:id', async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: "Lead deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
