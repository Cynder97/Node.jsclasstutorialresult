const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://sbessenbacher:JuiHY5MflyDuixcs@nodetutorial.tsrinsp.mongodb.net/?retryWrites=true&w=majority&appName=Nodetutorial'
mongoose.connect(bdURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});