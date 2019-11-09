const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);


const name = 'Andrew Mead';

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: name,
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About a robot',
        name: name,
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help',
        text: 'help text',
        name: name,
    })
});


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'location is required'
        })
    }
    const queryLocation = req.query.location;
    geocode(queryLocation, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error,
            });
        }
        forecast(longitude, latitude, (error, weatherMessage) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }
            res.send({
                queryLocation: queryLocation,
                location: location,
                forecast: weatherMessage,
            })
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: name,
        text: 'Help article not found'
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather app',
        name: name,
        text: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
