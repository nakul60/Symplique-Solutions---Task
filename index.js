const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const reminders = [];

app.post('/api/reminders', (req, res) => {
    const { date, time, message, method } = req.body;

    // Basic validation
    if (!date || !time || !message || !method) {
        return res.status(400).json({ error: 'All fields are required: date, time, message, method' });
    }

    if (!['SMS', 'Email'].includes(method)) {
        return res.status(400).json({ error: 'Method must be either SMS or Email' });
    }

    const reminder = {
        id: reminders.length + 1,
        date,
        time,
        message,
        method
    };

    reminders.push(reminder);

    return res.status(201).json({ message: 'Reminder saved successfully!', reminder });
});

app.listen(3000, () => {
    console.log('🚀 Server is running on http://localhost:3000');
});
