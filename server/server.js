import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
// import pdfRoute from './router/pdfRoutes.js'

const app = express();

/** middlewares */

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(200).json("Home GET Request");
});

/** api routes */
app.use('/api', router);
// app.use('/api', pdfRoute);


/** start server only when we have valid connection */
connect()
  .then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  });
