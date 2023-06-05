const express = require('express');
const app = express();
const path = require('path');
const port = 5050;


const serviceController = require('./controllers/serviceController')
app.use(express.json());

const loginRouter = require('./routes/route.js')

app.use('login', loginRouter);


app.use('/setup', serviceController.createServiceAccount, serviceController.createToken, (req, res) => {
  const response = {
    serviceAccount: res.locals.serviceAccount,
    token: res.locals.token,
    authorization: res.locals.authorization
  }
});

app.use((req, res) => res.status(404).send('Page Not Found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
