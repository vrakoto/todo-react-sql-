require('./db/testconnection').connect()
const express = require('express');
const app = express(),
      bodyParser = require("body-parser"),
      port = 4000,
      indexRouter = require('./routes/index'),
      userRouter = require('./routes/user'),
      session = require('express-session'),
      passport = require('passport')

app.use(bodyParser.json());

// Passport Config
require('./config/passport')(passport);

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

/* app.use(function(req, res, next) {
    res.locals.auth = req.user;
}); */

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});