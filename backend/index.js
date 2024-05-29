const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3001;
const TodoModel = require('./Models/Todo');
const UserModel = require('./Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'diminyingsecret';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test');
app.listen(port, () => {
  console.log('server is running');
});
app.get('/', async (req, res) => {
  const result = await TodoModel.find({});
  res.send(result);
});

// JSON.parse  JSON -> JS object
// JSON.stringify JS object -> JSON
// app.get('/:id', (req, res) => {
//     const{id} = req.params;
//     TodoModel.findById
//     res.send('GET request to homepage');
//   });
app.post('/add', async (req, res) => {
  try {
    const {task, completed, isEditing} = req.body;
    const result = await TodoModel.create({
      task: task,
      completed: completed,
      isEditing: isEditing,
    });

    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});

app.post('/update', async (req, res) => {
  try {
    const {_id, task} = req.body;
    const result = await TodoModel.findByIdAndUpdate(_id, {task: task}, {new: true});
    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});
app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await TodoModel.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});
app.post('/complete/:id', async (req, res) => {
  try {
    const {_id, completed} = req.body;
    const result = await TodoModel.findByIdAndUpdate(_id, {completed: !completed}, {new: true});
    res.send(result);
  } catch (error) {
    console.log('error', error);
  }
});

app.post('/register', async (req, res) => {
  const {email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const exsitedUser = await UserModel.findOne({email});
    if (exsitedUser) {
      return res.send({error: 'User exists'});
    } else {
      const result = await UserModel.create({email, password: encryptedPassword});
      res.send(result);
    }
  } catch (error) {
    console.log('error', error);
  }
});

app.post('/login-user', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.send({error: 'user not exists'});
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {email: email},
        },
        JWT_SECRET
      );
      if (res.status(201)) {
        return res.json({status: 'ok', data: token});
      } else {
        return res.json({error: 'error'});
      }
    }
    res.json({status: 'error', error: 'Invalid password'});
  } catch (error) {}
});

// token valid
const tokenAuth = (req, res, next) => {
  const {token} = req.body;
  if (!token) {
    res.send({error: 'token not exists'});
  } else {
    try {
      const tokenRes = jwt.verify(token, JWT_SECRET);
      const useremail = tokenRes.data.email;
      req.userEmail = useremail;
      next();
    } catch (error) {
      return res.json({status: 401, error: 'token is invalid'});
    }
  }
};

app.post('/userData', tokenAuth, async (req, res) => {
  const {userEmail} = req;
  try {
    UserModel.findOne({email: userEmail}).then((data) => {
      res.send({status: 'ok', data: data});
    });
  } catch (error) {
    console.log('error', error);
  }
});
