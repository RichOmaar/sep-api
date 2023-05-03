const express = require('express');
const bodyParser = require('body-parser');

// import usersRouter from './routes/users.js';
const sep = require('./routes/sep.js');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// app.use('/users', usersRouter);
app.use('/sep', sep);

app.get('/', (req,res) => {
    res.send("Hello world from Homepage");
});

app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`)
});
