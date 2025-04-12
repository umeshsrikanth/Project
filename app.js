const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/contactForm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const products = [
        {
            id: 1,
            name: "UltraBook Pro",
            description: "Lightweight and powerful for professionals on the go.",
            price: "160,000",
            image: "laptop1.jpg"
        },
        {
            id: 2,
            name: "Gaming Beast",
            description: "High-performance gaming laptop with RGB lighting.",
            price: "80,000",
            image: "laptop2.jpg"
        },
        {
            id: 3,
            name: "Creative Studio",
            description: "Perfect for designers and content creators.",
            price: "90,000",
            image: "laptop3.jpg"
        }
    ];
    res.render('index', { products });
});

app.post('/contact', async (req, res) => {
    try {
        const contactData = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await contactData.save();
        res.send('Thank you for contacting us!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
