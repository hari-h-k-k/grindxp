const express = require('express');
const connectDB = require('./utils/connectDb');
const userRouter = require('./routes/userRoutes');
const habitRouter = require('./routes/habitRoutes');
const groupRouter = require('./routes/groupRoutes');
const userGroupRouter = require('./routes/userGroupRoutes');
const userHabitRouter = require('./routes/userHabitRoutes');

port = 5000

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public'));
app.use(express.json())


app.use('/users',userRouter);
app.use('/habits',habitRouter);
app.use('/groups',groupRouter);
app.use('/usergroup',userGroupRouter);
app.use('/userhabit',userHabitRouter);



app.listen(port, () => {
    console.log('Server has started');
  });


connectDB();

