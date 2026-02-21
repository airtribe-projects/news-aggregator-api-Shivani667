require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/auth'); 
const preferencesRoutes = require('./routes/preferences');
const newsRoutes = require('./routes/news');


// Use routes
app.use('/users', authRoutes);
app.use('/users', preferencesRoutes);
app.use('/news', newsRoutes);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;