// Node js -

// Implement a GET API in Node.js that takes two numbers as parameters, 
// adds them, and sends the result. 
// Create validations around input parameters to accept numeric values. 
// Additionally, incorporate authentication using middleware.

const validateNumber = (number1, number2) => {
    const invalidNumbers = []
    const numbers = [number1, number2]
    numbers.forEach(num => {
        if (isNaN(num)) {
            invalidNumbers.push(num)
        }
    });
    return invalidNumbers.length > 0 ? invalidNumbers : false;
}

const isAuthenticated = (req, res, next) => {
    try {
        const apiKey = req.headers['api-key'];
        if (apiKey === process.env.API_KEY) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (e) {
        console.log("Error in middleware", e);
        res.status(401).json({ message: e.message || 'Unauthorized' })
    }
}

const addNumber = (req, res) => {
    try {
        const { number1, number2 } = req.query;
        const invalidNumbers = validateNumber(number1, number2);
        if (invalidNumbers) {
            res.status(400).json({ message: `Invalid numbers:  ${invalidNumbers.join(', ')}` })
        } else {
            res.status(200).json({ result: parseInt(number1) + parseInt(number2), message: "Success" })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error' })
    }
}

const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const port = 3000;
const app = express();
app.use(express.json())
app.get('/get-sum', isAuthenticated, addNumber);
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});
