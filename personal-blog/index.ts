import express from 'express';

const app = express();

app.set('view engine', 'ejs');


app.listen(8080);
console.log('Server is listening on port 8080');

