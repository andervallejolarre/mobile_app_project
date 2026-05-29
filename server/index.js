require('dotenv').config();

const express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 4040;

const discogsRoute = require('./routes/discogsRoute.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/discogs', discogsRoute);

app.listen(port, () => console.log(`listening on port ${port}`))