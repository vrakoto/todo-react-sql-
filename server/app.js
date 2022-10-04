require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require("body-parser");
const cors = require('cors');
const port = process.env.PORT;
const front_host = process.env.API_FRONT;
const visitorRouter = require('./routes/visitor');
const userRouter = require('./routes/user');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use((req, res, next) => {
    if (!req.session.login) {
       req.session.login = '';
    }
    if (!req.session.todos) {
        req.session.todos = []
    }
    next();
 });

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: front_host }));

// Routes
app.use('/', visitorRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});