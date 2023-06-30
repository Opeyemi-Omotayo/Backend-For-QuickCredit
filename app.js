const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const SignupRoutes = require('./routes/SignUp-routes');
const LoginRoutes = require('./routes/Login-routes');
const LoanRoutes = require("./routes/Loan-routes");
const ErrorMsg = require('./models/Error');

const app = express();

app.use(bodyParser.json());

app.use('/files/documents', express.static(path.join('files', 'documents')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PATCH, DELETE');
  // if (req.method === "OPTIONS") {
  //   return res.sendStatus(200);
  // }
  if(req.method === 'OPTIONS') {
    return res.status(200).json(({ body: "OK" })) 
   }
  next();
});

app.use('/api/users', SignupRoutes);
app.use('/api/users', LoginRoutes );
app.use('/api/users', LoanRoutes);


app.use((req, res, next) => {
  const error = new ErrorMsg('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


mongoose.set('strictQuery', true);

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-nimymu8-shard-00-00.h80nr7g.mongodb.net:27017,ac-nimymu8-shard-00-01.h80nr7g.mongodb.net:27017,ac-nimymu8-shard-00-02.h80nr7g.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-1195zl-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {useNewUrlParser: true} 
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
  });
