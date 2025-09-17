    require('dotenv').config();
    const express = require('express');
    const mongoose = require('mongoose');
    const nodemailer = require('nodemailer');
    const { connectDB } = require('./config/connectDB');

    const app = express();
    app.use(express.json());
    connectDB();

    // Models
    //user
    const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }
    });
    const User = mongoose.model('User', userSchema);

    //order
    const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'delivered', 'completed', 'cancelled'],
        default: 'pending'
    },
    reviewed: { type: Boolean, default: false }
    });
    const Order = mongoose.model('Order', orderSchema);

    //review
    const reviewSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    });
    const Review = mongoose.model('Review', reviewSchema);

    //Nodemailer
    const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });

    transporter.verify()
    .then(() => console.log('Email transporter ready'))
    .catch(err => console.warn('Email transporter verify failed:', err.message));

    async function sendReviewEmail(to, stars, description) {
    let subject, text;
    if (stars <= 2) {
        subject = 'We are sorry about your experience';
        text = `Hello,\n\nWe are sorry your experience was not good (${stars} stars).\nWe received your message: "${description}".\nWe will investigate and try to improve.\n\nBest regards.`;
    } else if (stars === 3) {
        subject = 'Thank you for your feedback';
        text = `Hello,\n\nThank you for your review (${stars} stars).\nWe appreciate your comment: "${description}".\nWe will keep improving our service.\n\nBest regards.`;
    } else {
        subject = 'Thank you for your great review!';
        text = `Hello,\n\nThank you for your ${stars}-star review!\n"${description}"\nStay tuned for our latest offers.\n\nBest regards.`;
    }

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });
    }

    const allowedReviewStates = ['delivered', 'completed'];

    // review route
    app.post('/review/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { email, stars, description } = req.body;

        if (!email || stars === undefined || stars === null || !description) {
        return res.status(400).json({ message: 'Body must include: email, stars, description' });
        }

        if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid orderId' });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
        return res.status(404).json({ message: 'User (email) not found in database' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
        return res.status(404).json({ message: 'Order not found' });
        }

        if (!order.user.equals(user._id)) {
        return res.status(403).json({ message: 'Order does not belong to the provided email' });
        }

        if (!allowedReviewStates.includes(order.status)) {
        return res.status(400).json({ message: 'Order is not delivered/completed yet. Reviews allowed only after delivery.' });
        }

        const intStars = Number(stars);
        if (!Number.isInteger(intStars) || intStars < 1 || intStars > 5) {
        return res.status(400).json({ message: 'Stars must be an integer between 1 and 5' });
        }

        const existing = await Review.findOne({ order: order._id });
        if (existing) {
        return res.status(409).json({ message: 'This order has already been reviewed' });
        }

        const review = new Review({
        order: order._id,
        user: user._id,
        stars: intStars,
        description: String(description).trim()
        });
        await review.save();

        order.reviewed = true;
        await order.save();

        await sendReviewEmail(user.email, intStars, review.description);

        return res.status(201).json({ message: 'Review created and email sent', review });
    } catch (err) {
        console.error('POST /review error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
    });


    //running server
    mongoose.connection.once("connected", () => {
        console.log("Connected to MongoDB...........");
        server.listen(3000, () => {
            console.log("Server running on http://localhost:3000..........");
        });
    
    });
    
    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
    
