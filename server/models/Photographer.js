const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    specialty: String, // e.g. Lead, Second, Video, Drone
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    profileImage: String,
}, { timestamps: true });

module.exports = mongoose.models.Photographer || mongoose.model('Photographer', photographerSchema);
