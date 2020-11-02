import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js'

const app = express();
const port = 3000;

app.set('view engine','ejs')

app.use( bodyParser.urlencoded({ extended: true}));
app.use( bodyParser.json());

const home = (request, response) => {
    response.send('hi there')
}
app.get('/', home);
app.use('/users', userRoutes);
app.listen( port, () => console.log( 'listening on port ' + port));
