import "reflect-metadata";
import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
const app = express();

// Load database
require("./db");

// Load global middlewares
app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize())

// Load authentication
require('./config/passport');

// Load routes
app.use('/api/v1', require('./routes'));

// Serve static assets
app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

// Start server
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
