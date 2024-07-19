const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/taskmanager')
  .then(async () => {
    console.log('MongoDB connected');
    await User.create([
      { name: 'User One', email: 'userone@example.com', password: 'password1' },
      { name: 'User Two', email: 'usertwo@example.com', password: 'password2' },
    ]);
    console.log('Users created');
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));
