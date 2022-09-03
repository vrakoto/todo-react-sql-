require('./db/testconnection').connect()
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

// cors
app.use(cors())

// Passport Config
require('./config/passport')(passport);

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.auth = req.user;
});


// Routes
app.use('/', indexRouter);
// app.use('/user', userRouter);

app.listen(3001, () => {
    console.log("Server Has Started");
});