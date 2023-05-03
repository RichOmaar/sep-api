import express from 'express';
import bodyParser from "body-parser";

// import usersRouter from './routes/users.js';
import sep from './routes/sep.js';

const app = express();
const PORT = 8889;

app.use(bodyParser.json());

// app.use('/users', usersRouter);
app.use('/sep', sep);

app.get('/', (req,res) => {
    res.send("Hello world from Homepage");
});

app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`)
});