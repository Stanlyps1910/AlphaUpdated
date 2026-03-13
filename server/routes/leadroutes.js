const express = require('express');
const Lead = require('../models/Lead');
const Task = require('../models/Task');
const Photographer = require('../models/Photographer');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Notification = require('../models/Notification');

const router = express.Router();

router.get('/', async (req, res) => {
    const leads = await Lead.find().populate('tasks');
    res.json(leads);
});

router.post('/', async (req, res) => {
    try {
        const { createAccount, firstName, lastName, accountEmail, password, ...leadData } = req.body;
        
        // Save lead
        const lead = new Lead(leadData);
        await lead.save();

        // Create User Account if requested
        if (createAccount && firstName && lastName && password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = new User({
                firstName,
                lastName,
                email: accountEmail || req.body.email,
                password: hashedPassword,
                role: 'client',
                galleryTag: leadData.galleryTag,
                cloudLink: leadData.cloudLink,
                cloudPassword: leadData.cloudPassword,
                leadId: lead._id
            });
            await newUser.save();
        }

        await Notification.create({
            title: "New Lead Acquired",
            description: `${lead.name} has been added to the registry as a new ${lead.status} lead.`,
            type: "Lead"
        });

        res.json(lead);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
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

        // Also update corresponding User if linked or email matches
        if (updatedLead) {
            await User.findOneAndUpdate(
                { $or: [{ leadId: updatedLead._id }, { email: updatedLead.email }] },
                { 
                    galleryTag: updatedLead.galleryTag,
                    cloudLink: updatedLead.cloudLink,
                    cloudPassword: updatedLead.cloudPassword,
                    leadId: updatedLead._id // Ensure link is set
                }
            );
        }

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
