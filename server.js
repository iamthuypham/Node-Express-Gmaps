const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const CORS = require('cors');
const googleMapsLibrary = require('@google/maps');

const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CORS());

const googleMaps = googleMapsLibrary.createClient({
    key: config.keys.GOOGLE_API_KEY
});

app.post('/api/places', (req, res) => {
    const { searchString } = req.body
    if (searchString) {
        return googleMaps.places({
            query: searchString
        }, (err, response) => {
            if (err) {
                res.status(500).json({ errorMessage: err })
            } else {
                res.status(200).json({ data: response.json.results })
            }
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide some keywords to start searching." });
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
