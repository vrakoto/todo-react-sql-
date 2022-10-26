require('dotenv').config();
// const { forwardAccessWhileConnected, validateToken } = require('./functions/func');
const { sequelize } = require('./db/config');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const port = process.env.PORT;
const front_host = process.env.API_FRONT;
const visitorRouter = require('./routes/visitor');
const userRouter = require('./routes/user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: front_host }));

// Routes
app.use('/', visitorRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});