const express = require('express'); //Express framework
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const USER = require('./DB/User');

//Database Connection
mongoose.connect(
  'mongodb+srv://DBUSER:dbUser@cluster0.wahsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log('Connected to DataBase')
);

//Middleware
app.use(express.json());
app.use(cors());

//APIs

//Create Data
app.post('/insert', async (req, res) => {
  const user = new USER({
    Title: req.body.Title,
    Content: req.body.Content,
  });
  try {
    await user.save();
    res.send('inserted data');
    return;
  } catch (err) {
    res.send({ error: err });
    return;
  }
});
//Read Data
app.get('/read', async (req, res) => {
  USER.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

//Update Data
app.put('/update', async (req, res) => {
  const newContent = req.body.newContent;
  const id = req.body.id;
  try {
    await USER.findById(id, (err, updatedContent) => {
      updatedContent.Content = newContent;
      updatedContent.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete Data
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  await USER.findByIdAndRemove(id).exec();
  res.send('deleted');
});

//Hosting at PORT
const PORT = 3009;
app.listen(PORT, () => console.log('Listening at Port ' + PORT));
