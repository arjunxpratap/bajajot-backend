const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

app.use(bodyParser.json());
const upload = multer();

// Root URL Route
app.get('/', (req, res) => {
    res.send('Welcome to the Bajaj OT Backend API');
});

// POST /bfhl
app.post('/bfhl', upload.none(), (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(ch => ch === ch.toLowerCase()).sort().pop() || null;

    const response = {
        is_success: true,
        user_id: "arjun_pratap_17022003", 
        email: "ar5845@srmist.edu.in",
        roll_number: "RA2111003011111",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        file_valid: !!file_b64,
        file_mime_type: "image/png", 
        file_size_kb: file_b64 ? Buffer.byteLength(file_b64, 'base64') / 1024 : 0
    };

    res.json(response);
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
