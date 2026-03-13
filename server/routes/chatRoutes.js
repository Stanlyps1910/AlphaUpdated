const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

// @route   POST api/chats
// @desc    Send a message
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { text, recipient } = req.body;
        const user = await User.findById(req.user.id);

        const newMessage = new Message({
            sender: req.user.id,
            senderName: user ? user.firstName : 'Unknown',
            recipient: recipient || 'admin',
            text
        });

        const message = await newMessage.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/chats
// @desc    Get user's chat history
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Find messages where user is either sender or recipient
        const messages = await Message.find({
            $or: [
                { sender: req.user.id },
                { recipient: req.user.id }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/chats/admin/conversations
// @desc    Get all conversations for admin
// @access  Private (Admin only)
router.get('/admin/conversations', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    try {
        // Group messages by sender (clients)
        const messages = await Message.find({ recipient: 'admin' }).sort({ timestamp: -1 });
        
        // Simple grouping in JavaScript (can be optimized with aggregation)
        const conversations = {};
        messages.forEach(msg => {
            if (!conversations[msg.sender]) {
                conversations[msg.sender] = {
                    userId: msg.sender,
                    userName: msg.senderName,
                    lastMessage: msg.text,
                    timestamp: msg.timestamp
                };
            }
        });

        res.json(Object.values(conversations));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/chats/admin/:userId
// @desc    Get specific conversation for admin
// @access  Private (Admin only)
router.get('/admin/:userId', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    try {
        const messages = await Message.find({
            $or: [
                { sender: req.params.userId },
                { recipient: req.params.userId }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
