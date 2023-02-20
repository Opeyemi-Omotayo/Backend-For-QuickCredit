const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SignupRoutes = require('./routes/SignUp-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api', SignupRoutes);


mongoose.set('strictQuery', true);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h80nr7g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true} 
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });