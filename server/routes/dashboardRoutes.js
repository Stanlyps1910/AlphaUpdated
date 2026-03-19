const express = require('express');
const Lead = require('../models/Lead');
const Gallery = require('../models/Gallery');
const Task = require('../models/Task');
const Finance = require('../models/Finance');

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const totalPhotos = await Gallery.countDocuments();
        const leadsCount = await Lead.countDocuments();

        const avgPhotoSizeMB = 15;
        const totalStorageLimitMB = 1048576; // 1 TB
        const usedStorageMB = totalPhotos * avgPhotoSizeMB;
        const usedPercentage = ((usedStorageMB / totalStorageLimitMB) * 100).toFixed(1);

        const storageUsage = `${usedPercentage}%`;

        const pendingApprovals = await Task.countDocuments({ status: { $ne: 'Completed' } });

        const organicTraffic = (leadsCount * 50) + (totalPhotos * 5);
        const traffic = organicTraffic >= 1000 ? `${(organicTraffic / 1000).toFixed(1)}K` : organicTraffic.toString();

        res.json({
            totalPhotos,
            storageUsage,
            pendingApprovals,
            traffic
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/recent-activity', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ updatedAt: -1 }).limit(5);

        const activity = await Promise.all(leads.map(async (lead) => {
            const photoCount = await Gallery.countDocuments({ albumName: lead.name });
            return {
                _id: lead._id,
                name: `${lead.eventType || 'Event'} of ${lead.name}`,
                date: new Date(lead.updatedAt).toLocaleDateString(),
                count: `${photoCount} photos`,
                status: lead.status === 'Converted' ? 'Delivered' : (lead.status === 'New' ? 'Reviewing' : lead.status)
            };
        }));

        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/upcoming-events', async (req, res) => {
    try {
        const today = new Date();
        const events = await Lead.find({
            eventDate: { $gte: today }
        })
            .sort({ eventDate: 1 })
            .limit(5);

        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
